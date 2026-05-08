from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/login')

def get_current_user(token: str = Depends(oauth2_scheme)):
  try:
    payload = jwt.decode(token,os.getenv('SECRET_KEY'), algorithms=[os.getenv("ALGORITHM")])
    email : str = payload.get('sub')
    if email is None:
      raise HTTPException(status_code = HTTP_401_UNAUTHORIZED, detail = 'Invalid Token')
    return email
  except jwt.ExpiredSignatureError:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail = 'Token expired')
  except jwt.InvalidTokenError:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail = 'Invalid Token')
  