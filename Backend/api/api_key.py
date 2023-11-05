
from flask import request,session
from flask_restful import Resource,reqparse
from models.api import APIKeyModel
from app import db
import secrets



parser = reqparse.RequestParser()
parser.add_argument('key', required=True, help='API key is required')

class APIKey(Resource):
    def post(self):
        if 'username' not in session or session.get('counter', 0) >= 10:
            return {'message': 'Not authenticated or session expired'}, 401
        session['counter'] += 1

        data = request.json
        name = data.get('name')
        creator = data.get('creator')
        
        if not name or not creator:
            return {'message': 'Name and creator are required'}, 400
        
        if APIKeyModel.query.get(name):
            return {'message': 'API key with this name already exists'}, 400
        
        key = secrets.token_hex(16)
        new_key = APIKeyModel(name=name, creator=creator, key=key)
        db.session.add(new_key)
        db.session.commit()
        
        return {'name': name, 'creator': creator, 'key': key}, 201
    
    def delete(self, name,creator):
        if 'username' not in session or session.get('counter', 0) >= 10:
            return {'message': 'Not authenticated or session expired'}, 401
        session['counter'] += 1
        args = parser.parse_args()
        key = args['key']

        api_key = APIKeyModel.query.get(name)
        if not api_key:
            return {'message': 'API key not found'}, 404

        if api_key.key != key:
            return {'message': 'Invalid API key'}, 403


        creator_key = APIKeyModel.query.filter_by(creator=creator, key=key).first()
        if not creator_key:
            return {'message': 'You are not authorized to delete this API key'}, 403


        db.session.delete(api_key)
        db.session.commit()
        return {'message': 'API key deleted successfully'}, 200



