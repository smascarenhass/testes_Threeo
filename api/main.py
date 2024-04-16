from fastapi import FastAPI, HTTPException, Header, Depends

from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
import jwt
from components.models.user import User_model
from components.controllers.user import User_controller
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bearer = HTTPBearer()

JWT_SECRET_KEY = "tzE5drUmmncjZCNzS3-KCf8o-P76hMRIDtBd9Gu3oVQ"
JWT_HASH = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_jwt_token(data: dict) -> str:
    return jwt.encode(data, JWT_SECRET_KEY, algorithm=JWT_HASH)

def validate_token(token: str):
    if not token:
        raise HTTPException(status_code=401, detail="Token não fornecido")

    try:
        jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_HASH])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

@app.post("/login")
def login(user: User_model):
    db_user = User_controller.authenticate_user(user)
    if db_user:
        jwt_token = create_jwt_token({"sub": db_user["email"], "name": db_user["name"], "email": db_user["email"]})
        return {
            "status": True, 
            "access_token": jwt_token, 
            "token_type": "bearer", 
            "user": db_user
            }
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

@app.get("/users")
def users(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    if credentials.scheme != "Bearer" or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Token não fornecido")

    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET_KEY, algorithms=[JWT_HASH])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

    all_users = User_controller.all_users()

    return {"status": True, "message": "Token fornecido com sucesso", "users": all_users}

@app.post("/users/add_user")
def create_user(user: User_model, credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    validate_token(credentials.credentials)

    result = User_controller.new_user(user)
    return result

@app.delete("/users/remove/{user_id}")
def delete_user(user_id: str, credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    validate_token(credentials.credentials)

    existing_user = User_controller.get_user_by_user_id(user_id)
    if not existing_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    result = User_controller.remove_user(user_id)
    return {"message": "Usuário excluído com sucesso"}

