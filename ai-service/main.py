from fastapi import FastAPI, UploadFile, File
import pdfplumber

app = FastAPI()


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