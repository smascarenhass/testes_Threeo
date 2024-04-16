
import argon2


def create_password_hash(password: str):

    hashed_password = argon2.PasswordHasher(salt_len=32).hash(password)
    return hashed_password


def verify_password_hash(password: str, hashed_password: str):

    is_valid = argon2.PasswordHasher(salt_len=32).verify(hashed_password, password)
    return is_valid


def main():
    hashed_password = create_password_hash("teste")
    verify_password_hash("teste", hashed_password)


if __name__ == "__main__":
    main()