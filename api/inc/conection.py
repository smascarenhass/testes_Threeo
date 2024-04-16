from pymongo import MongoClient
from settings import *

client = MongoClient(f'mongodb://{USER_DB}:{PASSWORD_DB}@{DATABASE_IP}:{PORT_DB}/')

class Database:

    def get_all_user():
        db = client['users']
        users = db.users
        if users.count_documents({}) == 0:
            users_db = [{"name": "admin", "email": "admin@gmail.com", "password": "admin"}]
            users.insert_many(users_db)
        return users