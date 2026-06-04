from pydantic import  BaseModel, EmailStr

class UserAuth(BaseModel):
  email:EmailStr
  password: str