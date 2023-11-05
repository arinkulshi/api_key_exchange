
from flask_restful import Api
from api.api_key import APIKey
from api.auth import SignupApi, LoginApi, LogoutApi



def initialize_routes(api):
    
    api.add_resource(APIKey, '/api_key', '/api_key/<string:name>/<string:creator>')
    api.add_resource(SignupApi, '/auth/signup')
    api.add_resource(LoginApi, '/auth/login')
    api.add_resource(LogoutApi, '/auth/logout')

