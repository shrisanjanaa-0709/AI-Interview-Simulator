from datetime import datetime, timezone
from database import db
from fastapi.middleware.cors import CORSMiddleware
from evaluator import  evaluate_all_answers
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import pdfplumber
from google import genai
import os
from dotenv import load_dotenv

users_collection = db["users"]
interviews_collection = db["interviews"]

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

class SkillsInput(BaseModel):
    skills: list[str]
class Answer(BaseModel):
    question: str
    answer: str

class EvaluationRequest(BaseModel):
    skills: list[str]
    education: list[str]
    projects: list[str]
    experience: list[str]
    answers: list[Answer]
       
@app.get("/")
def home():
    return {
        "message": "AI Interview Simulator AI Service Running"
    }


@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):

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
async def generate_questions(data: SkillsInput):

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
def evaluate(request: EvaluationRequest):
   
    result = evaluate_all_answers(request.answers)

   
    interview_data = {
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

