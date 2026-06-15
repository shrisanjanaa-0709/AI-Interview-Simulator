from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import pdfplumber
from google import genai
import os
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


class SkillsInput(BaseModel):
    skills: list[str]
@app.get("/")
def home():
    return {
        "message": "AI Interview Simulator AI Service Running"
    }


@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):

    text = ""

    # Extract text from PDF
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
    Generate exactly 10 technical interview questions.

    Skills:
    {", ".join(data.skills)}

    Return only the questions.
    Number them from 1 to 10.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    questions = response.text.split("\n")

    return {
        "questions": questions
    }