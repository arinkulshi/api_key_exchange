import unittest
from flask import Flask
from flask_restful import Api
from  Backend.api.api_key import APIKey
from db.db import db

class APIKeyTestCase(unittest.TestCase):
    
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.api = Api(self.app)
        self.api.add_resource(APIKey, '/api_key')
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_post(self):
        response = self.client.post('/api_key', json={'name': 'test', 'creator': 'test'})
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['name'], 'test')
        self.assertEqual(data['creator'], 'test')
        self.assertIsNotNone(data['key'])

    def test_delete(self):
        self.client.post('/api_key', json={'name': 'test', 'creator': 'test'})
        response = self.client.delete('/api_key/test/test')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['message'], 'API key deleted')

if __name__ == '__main__':
    unittest.main()