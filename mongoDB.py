import os
from flask import Flask, render_template, redirect, request, url_for, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId

app = Flask(__name__, static_folder="./dist", template_folder="./")

app.config.from_object(__name__)

app.config["MONGO_URI"] = "mongodb://z:21-Pilots@ds131698.mlab.com:31698/flask_assignment"
mongo = PyMongo(app)
# secret key
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


@app.route('/registeruser', methods=['GET', 'POST'])
def registerUser():
    user = {}
    data = request.get_json(silent=True)
    data = data["user"]
    for key in data:
        user[key] = data[key]
    print(user)
    mongo.db.tbl_users.insert(user)
    return "done"


@app.route('/loginuser', methods=['POST'])
def loginUser():
    login = {}
    data = request.get_json(silent=True)
    data = data["user"]
    for key in data:
        if key != "userName":
            login[key] = data[key]
    print(login)
    users = mongo.db.tbl_users.find_one(login)
    print(users)
    return "done"


@app.route('/addTodo', methods=['GET'])
def addTodo():
    todo = {
        'title': 'going to gym',
        'userId': '8646873548443',
        'status': 'incomplete',
        'entryTime': '78438468464',
        'todoTime': '9764687168176'
    }
    mongo.db.tbl_todos.insert(todo)
    return "done"

@app.route('/updateTodo', methods=['GET'])
def updateTodo():
    Tid = '5b9e6a8ed36b5121c83994c3'
    updateTask = mongo.db.todo_tbl.find({'_id': ObjectId(Tid)}) # request.form['data']
    print(str(updateTask))
    # updateTask['status'] = 'Completed'
    # mongo.db.tbl_todos.save(updateTask)
    return "done"

@app.route('/deleteTodo', methods=['GET'])
def deleteTodo():
    mongo.db.todo_tbl.delete_one({'_id': ObjectId('5b9e6bf3d36b512694828e81')}) # request.form['data']
    return "done"

app.run(host='0.0.0.0', debug=True, port=5050)
