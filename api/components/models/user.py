from pydantic import BaseModel


class User_model(BaseModel):
    name: str
    email: str
    password: str