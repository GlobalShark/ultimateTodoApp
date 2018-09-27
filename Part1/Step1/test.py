import unittest
import os
import json, sys
from mongo import app
from flask import request

class Data(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['DEBUG'] = False
        self.app = app.test_client()

        self.assertEqual(app.debug, False)

    def tearDown(self):
        pass

    # create todo in api testing

    def test_post_create(self):
        response = self.app.post('/addTodo',
                                 data=json.dumps(dict({'title':'java','description':'app'})),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 200)
    def test_create_without_json(self):
        response = self.app.post('/addTodo')
        self.assertEqual(response.status_code, 400)

    def test_create_with_invalid_json(self):
        response = self.app.post('/addTodo',
                                 data=json.dumps(dict(status='changed')),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 400)
    # read todo data in one id
    def test_get_all_todo(self):
        response = self.app.get('/allTodo')
        self.assertEqual(response.status_code, 200)

    def test_get_single_todo(self):
            response = self.app.get('/getTodo/5babd6c5f9087e25fc6fc97c')
            self.assertEqual(response.status_code, 200)

    def test_get_single_invalid(self):
        response = self.app.get('/getTodo/5babd6c5f9087e25fc6fc9712')
        self.assertEqual(response.status_code, 204)


    # delete one todo in id
    def test_delete_one_todo(self):
            response = self.app.delete('/deleteTodo/5bac6367f9087e1b3a61aa5a')
            self.assertEqual(response.status_code, 200)

    def test_post_delete_invalid(self):
        response = self.app.post('/deleteTodo/5bac6367f9087e1b3a61aa5a')
        self.assertEqual(response.status_code, 405)

if __name__ == "__main__":
    unittest.main()
