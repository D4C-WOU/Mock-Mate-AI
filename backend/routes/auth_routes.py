from fastapi import APIRouter,HTTPException, status
from database import users_collection
from models.user import UserAuth
from auth.security import get_password_hash,verify_password,create_access_token

router = APIRouter(prefix='/auth',tags=['AUthentication'])

@router.post('/signup')
async def signup(user: UserAuth):
  existing_user= await users_collection.find_one({'email':user.email})
  if existing_user:
    raise HTTPException(status_code=400,detail="Email already registered")
  hashed_pass = get_password_hash(user.password)
  await users_collection.insert_one({'email': user.email, 'password': hashed_pass})
  return {'message':'User created successfully'}

@router.post('/login')
async def login(user:UserAuth):
  db_user= await users_collection.find_one({'email':user.email})
  if not db_user or not verify_password(user.password,db_user['password']):
    raise HTTPException(status_code=401, detail='Invalid Credentials')
  token = create_access_token(data={'sub':user.email})
  return {'access_token':token , 'token_type':'bearer'}