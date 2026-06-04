from pydantic import BaseModel

class InterviewConfig(BaseModel):
  job_title: str
  job_description: str
  difficulty: str
  interview_type: str