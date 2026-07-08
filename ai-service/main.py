from datetime import datetime, timezone, timedelta
from database import users_collection, interviews_collection
import bcrypt
from fastapi.middleware.cors import CORSMiddleware
from evaluator import  evaluate_all_answers
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import pdfplumber
from google import genai
import os
from dotenv import load_dotenv
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
JWT_EXPIRE_DAYS = int(os.getenv("JWT_EXPIRE_DAYS", 7))

security = HTTPBearer()

class SkillsInput(BaseModel):
    skills: list[str]
class Answer(BaseModel):
    question: str
    answer: str

class EvaluationRequest(BaseModel):
    user_id: str

    skills: list[str]
    education: list[str]
    projects: list[str]
    experience: list[str]

    answers: list[Answer]

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str    

class LoginRequest(BaseModel):
    email: str
    password: str    

def create_access_token(user):

    payload = {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "exp": datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRE_DAYS)
    }

    token = jwt.encode(
        payload,
        JWT_SECRET,
        algorithm=JWT_ALGORITHM
    )

    return token


def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM]
        )

        return payload

    except JWTError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
           
@app.get("/")
def home():
    return {
        "message": "AI Interview Simulator AI Service Running"
    }


@app.post("/parse-resume")
async def parse_resume(
    file: UploadFile = File(...),
    user=Depends(verify_token)
):
    text = ""

   
    with pdfplumber.open(file.file) as pdf:

        for page in pdf.pages:

            extracted = page.extract_text()

            if extracted:
                text += extracted + "\n"

   
    lines = text.split("\n")

    
    skills = []
    education = []
    projects = []
    experience = []

   
    current_section = None

    
    for line in lines:

        line = line.strip()

        
        if not line:
            continue

        upper_line = line.upper()

       
        if "TECHNICAL SKILLS" in upper_line:
            current_section = "skills"
            continue

        elif "EDUCATION" in upper_line:
            current_section = "education"
            continue

        elif "PROJECTS" in upper_line:
            current_section = "projects"
            continue

        elif "INTERNSHIP EXPERIENCE" in upper_line:
            current_section = "experience"
            continue

        
        elif upper_line in [
            "CERTIFICATIONS",
            "ACHIEVEMENTS",
            "POSITIONS OF RESPONSIBILITY",
            "SOFT SKILLS",
            "LANGUAGES KNOWN",
            "DECLARATION"
        ]:
            current_section = None
            continue

        
        if current_section == "skills":
            skills.append(line)

        elif current_section == "education":
            education.append(line)

        elif current_section == "projects":
            projects.append(line)

        elif current_section == "experience":
            experience.append(line)

   
    return {
        "skills": skills,
        "education": education,
        "projects": projects,
        "experience": experience
    }
@app.post("/generate-questions")
async def generate_questions(
    data: SkillsInput,
    user=Depends(verify_token)
):
    prompt = f"""
Generate EXACTLY 10 technical interview questions based on these skills.

Skills:
{", ".join(data.skills)}

Rules:
- Return ONLY the 10 questions.
- Do not add headings.
- Do not add explanations.
- One question per line.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    questions = [
        q.strip()
        for q in response.text.split("\n")
        if q.strip()
    ]

    questions = questions[:10]

    return {
        "questions": questions
    }
@app.post("/evaluate-answer")
def evaluate(
    request: EvaluationRequest,
    user=Depends(verify_token)
):
   
    result = evaluate_all_answers(request.answers)

   
    interview_data = {
        "user_id": request.user_id,
        "skills": request.skills,
        "education": request.education,
        "projects": request.projects,
        "experience": request.experience,

        "questions": [a.question for a in request.answers],
        "answers": [a.answer for a in request.answers],

        "evaluation": result["results"],

        "created_at": datetime.now(timezone.utc),
}

    
    insert_result = interviews_collection.insert_one(interview_data)

    print("Inserted ID:", insert_result.inserted_id)

    return result

@app.post("/signup")
def signup(user: SignupRequest):

   
    name = user.name.strip()
    email = user.email.strip().lower()
    password = user.password.strip()

    
    if not name or not email or not password:
        return {
            "success": False,
            "message": "All fields are required"
        }

    
    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }

   
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

   
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.now(timezone.utc)
    }

    result = users_collection.insert_one(user_data)

    user_data["_id"] = result.inserted_id

    token = create_access_token(user_data)

    return {
        "success": True,
        "message": "User registered successfully",
        "token": token,
        "user": {
            "id": str(user_data["_id"]),
            "name": user_data["name"],
            "email": user_data["email"]
        }
    }
@app.post("/login")
def login(user: LoginRequest):

    email = user.email.strip().lower()
    password = user.password.strip()

    if not email or not password:
        return {
            "success": False,
            "message": "Email and password are required"
        }

    existing_user = users_collection.find_one({"email": email})

    if not existing_user:
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    password_match = bcrypt.checkpw(
        password.encode("utf-8"),
        existing_user["password"].encode("utf-8")
    )

    if not password_match:
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    token = create_access_token(existing_user)

    return {
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": {
            "id": str(existing_user["_id"]),
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }