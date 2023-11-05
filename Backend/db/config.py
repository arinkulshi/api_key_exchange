import os

class Config:
    DB_TYPE = os.getenv('DB_TYPE', 'postgresql')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '5433')
    DB_USERNAME = os.getenv('DB_USERNAME', 'arindamkulshi')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')
    DB_DATABASE = os.getenv('DB_DATABASE', 'hep')

    SQLALCHEMY_DATABASE_URI = f"{DB_TYPE}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False