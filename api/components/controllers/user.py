
# Libs
from datetime import datetime
import uuid

# Database and hash impotaion
from inc.conection import Database
from components.controllers.pw_hash import create_password_hash, verify_password_hash

# Models
from components.models.user import User_model

database = Database.get_all_user()

class User_controller:

    @staticmethod
    def authenticate_user(model: User_model):
        model = model.dict()
        users_db = User_controller.all_users()
        for user in users_db:
            if model['email'] == user['email'] and "$argon2id" in user['password']:
                try:
                    matched_password = verify_password_hash(model['password'], user['password'])
                    if matched_password:
                        return user
                except Exception:
                    return None
            else:
                if model['email'] == user['email'] and model['password'] == user['password']:
                    return user

        return None

    def new_user(model: User_model):
        user_db = database
        user = model.dict()

        if user_db.find_one({"email": user['email']}, {'_id': False}):
            return {'status': False, 'message': 'E-mail já cadastrado'}

        user["created"] = datetime.now()
        user["id_"] = str(uuid.uuid4().hex[:16])

        user["password"] = create_password_hash(user["password"])

        user_db.insert_one(user)

        return {'message': 'Usuário adicionado com sucesso', 'status': True}

    def remove_user(client_id):
        user_db = database
        user = {'id_': client_id}
        result = user_db.delete_one(user)
        if result.deleted_count == 1:
            return {'message': 'Usuário removido com sucesso.'}
        else:
            return {'message': 'Usuário não encontrado.'}

    def all_users():
        user_db = database
        users = user_db.find({}, {'_id': False})
        result = list(users)
        return result

    def get_user_by_user_id(user_id):
        result = database.find({'id_': user_id}, {'_id': False})
        result = list(result)

        return result
