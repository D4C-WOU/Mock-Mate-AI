from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes

app = FastAPI(title="MockMate API")

app.add_middleware(
  CORSMiddleware,
  allow_origins = ['http://localhost:3000'],
  allow_credentials = True,
  allow_methods = ['*'],
  allow_headers = ['*']
)

app.include_router(auth_routes.router)

@app.get('/')
def read_root():
  return {
    'message' : 'Welcome nigga'
  }