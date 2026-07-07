from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def evaluate_all_answers(answers):

    formatted_answers = ""

    for i, item in enumerate(answers, start=1):

        if item.answer.strip():

            formatted_answers += f"""
Question {i}:
{item.question}

Answer {i}:
{item.answer}

"""

    prompt = f"""
You are an experienced technical interviewer.

Evaluate every question-answer pair.

{formatted_answers}

Return ONLY valid JSON in this format:

{{
  "results": [
    {{
      "technical": 8,
      "communication": 7,
      "confidence": 8,
      "strengths": [
        "...",
        "..."
      ],
      "improvements": [
        "...",
        "..."
      ],
      "feedback": "..."
    }}
  ]
}}

Rules:
- Return one object for each NON-EMPTY answer.
- technical, communication and confidence are integers from 1 to 10.
- If an answer is empty, do NOT evaluate it.
- strengths must contain exactly 2 points.
- improvements must contain exactly 2 points.
- Return ONLY JSON.
"""

    if formatted_answers.strip():

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.replace("```json", "").replace("```", "").strip()

        ai_results = json.loads(text)["results"]

    else:

        ai_results = []

    final_results = []

    ai_index = 0

    for item in answers:

        if not item.answer.strip():

            final_results.append({
                "technical": 0,
                "communication": 0,
                "confidence": 0,
                "strengths": [],
                "improvements": [
                    "Attempt every question.",
                    "Provide a complete answer."
                ],
                "feedback": "No answer was provided."
            })

        else:

            final_results.append(ai_results[ai_index])
            ai_index += 1

    return {
        "results": final_results
    }