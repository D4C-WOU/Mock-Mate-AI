from fastapi import APIRouter, Depends
from models.interview import InterviewConfig
from auth.dependencies import get_current_user
from database import db

router = APIRouter(prefix='/interviews', tags=['Interviews'])
interviews_collection = db['interviews']

@router.post('/setup')
async def setup_interview(config: InterviewConfig, current_user:str = Depends(get_current_user)):
  interview_data = config.model_dump()
  interview_data['user_email']= current_user
  interview_data['status']= 'configured '  #tracks the state of interview

  result = await interviews_collection.insert_one(interview_data)

  return { 'message':'Interview configured successfully', 'interview_id':str(result.inserted_id)}