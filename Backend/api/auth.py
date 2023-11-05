from flask import request, session
from flask_restful import Resource
from models.user import User
from app import db

class SignupApi(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if User.query.filter_by(username=username).first():
            return {'message': 'User with this username already exists'}, 400
        user = User(username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        session['username'] = user.username
        session['counter'] = -1

        return {'message': 'Registered successfully'}, 201

class LoginApi(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if not user or not user.check_password(data['password']):
            return {'message': 'Invalid username or password'}, 401
        session['username'] = user.username
        session['counter'] += 1 
        if session.get('counter', 0) >= 10:
            return {'message': 'Session expired'}, 401
        

        
        return {'message': 'Login successful'}, 200

class LogoutApi(Resource):
    def post(self):
        session.pop('username', None)
        session.pop('counter', None)
        return {'message': 'Logout successful'}, 200