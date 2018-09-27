import os
import unittest
import json, sys
from postgress import app
from flask import request

class TestApp(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['Debug'] = False
        self.app = app.test_client()



    def tearDown(self):
        pass
   
    def create_todo(self):
        response=self.app.post('/AddTodo', data=json.dumps(dict(addTodo='testing')), content_type='json/application')
        self.assertEqual(response.status_code, 200)

    def create_todo_without_json(self):
        response = self.app.post('/addTodo')
        self.assertEqual(response.status_code, 400)
    def get_one_todo_valid(self):
        response = self.app.get('/fetchtodoapi/v1.0/1')
        self.assertEqual(response.status_code, 200)
    def get_one_todo_invalid(self):
        response = self.app.get('/fetchtodoapi/v1.0/1')
        self.assertEqual(response.status_code, 204)
    def update_todo(self):
        response = self.app.put('/api/v1.0/update')
        self.assertEqual(response.status_code, 200)
    def delete_todo(self):
        response = self.app.delete('/deleteTodo/2')
        self.assertEqual(response.status_code, 200)
    def delete_todo_with_invalid(self):
        response = self.app.delete('/deleteTodo/2')
        self.assertEqual(response.status_code, 204)
if __name__ == '__main__':
    unittest.main()
        
