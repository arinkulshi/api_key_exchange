from flask import Flask
from flask_restful import Api
from db.config import Config
from db.db import db
from routes.routes import initialize_routes



def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.secret_key = 'super secret key'

    db.init_app(app)
    api = Api(app)
    
    with app.app_context():
        db.create_all()

    initialize_routes(api)

    return app

app = create_app()