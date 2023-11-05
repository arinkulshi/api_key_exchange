from app import db

class APIKeyModel(db.Model):
    __tablename__ = 'api_keys'

    name = db.Column(db.String(50), primary_key=True)
    creator = db.Column(db.String(50), nullable=False)
    key = db.Column(db.String(64), nullable=False, unique=True)