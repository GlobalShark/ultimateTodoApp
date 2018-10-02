from flask import Flask, render_template, redirect, request, url_for, jsonify, session, json, session
from flask_pymongo import PyMongo
from bson.json_util import dumps

from bson import json_util, ObjectId

app = Flask(__name__, static_folder="./dist", template_folder="./")


app.config.from_object(__name__)

# Mongo db connection
app.config['MONGO_DBNAME'] = 'ultimatetodo'
app.config['MONGO_URI'] = 'mongodb://ultimate:todo123@ds157522.mlab.com:57522/ultimatetodo'
mongo = PyMongo(app)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# Redirect path to client 
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

# Register User
@app.route('/registeruser', methods=['POST'])
def registerUser():
    userRegister = "not-success"
    user = {}
    data = request.get_json(silent=True)
    data = data["user"]
    for key in data:
        user[key] = data[key]
    print(user)
    task = mongo.db.tbl_users.insert(user)
    userRegister = "success"
    return userRegister

# Login User
@app.route('/loginuser', methods=['POST'])
def loginUser():
    userAuth = 'notsuccess'
    login = {}
    data = request.get_json(silent=True)
    data = data["user"]
    userKey = ''
    for key in data:
        if key != "userName":
            login[key] =  data[key]          
            userAuth = 'success'
            users = mongo.db.tbl_users.find_one(login)
            userKey  = users['_id'] 
            break
            session['logged_in'] = True 
        else:
            userAuth = 'not-success'
    key = json.loads(json_util.dumps(userKey))
    userData = json.loads(json_util.dumps(users))
    session['userKey'] = key['$oid']
    session['userVal'] = userData
    return userAuth

# Logged in user getdata
@app.route('/logginUserData', methods=['GET'])
def loggedinUser():
    data = session
    dataUid = session['userKey']
    datareq = data['userVal']
    print('id', datareq['_id'])
    userVal = {
        'email': datareq['email'],
        'username': datareq['userName'],
        'joiningdate': datareq['joiningdate'],
        'uid': dataUid
    }
    return jsonify(userVal)

# user Logour
@app.route('/logoutUser', methods=['POST'])
def logoutUser():
    users = session
    logout = request.get_json(silent=True)
    session.clear()
    return 'Sucesfully logout'

# All Todo
@app.route('/allTodo', methods=['GET'])
def allTodo():
    todo = mongo.db.todo_add
    tasks = []
    for task in todo.find():
        id = json.loads(dumps(task['_id']))

        tasks.append({
            '$oid':id,
            'title':task['title'],
        })
    return jsonify(tasks)

# Get Todo by their oid
@app.route('/getTodo/<string:id>', methods=['GET'])
def getTodo(id):
    todo = mongo.db.todo_add
    result = todo.find_one({'_id': ObjectId(id)})
    if result:
        id = json.loads(dumps(result['_id']))
        task = {
            '_id': id["$oid"],
            'title': result['title'],
            'description': result['description']
        }
        return jsonify({'output': task})
    else:
        return False

# Add todo
@app.route('/addTodo', methods=['POST'])
def addTodo():
    data=request.get_json(silent=True)
    data = data['data']
    title = data['typedTodo']
    # description = request.json['description']
    todo = mongo.db.todo_add
    todo.insert_one({'title': title,})
    return jsonify({'message': 'SuccessFully add'})

# Update Todo
@app.route('/update', methods=['PUT'])
def updateTodo():
    data=request.get_json(silent=True)
    data = data['data']
    updateTodo= data['updateTodo']
    id = data['uid']
    todo = mongo.db.todo_add
    result = todo.find_one({'_id': ObjectId(id)})
    result['title'] = updateTodo
    # result['description'] = request.json['description']
    todo.save(result)
    return jsonify({'message': 'SuccessFully Updated'})

# Delete Todo
@app.route('/deleteTodo', methods=['DELETE'])
def deleteTodo():
    data=request.get_json(silent=True)
    id = data['uid']
    todo = mongo.db.todo_add
    result = todo.find_one({'id': ObjectId(id)})
    if result:
        id = json.loads(dumps(result['_id']))
    todo.delete_one(result)
    return jsonify({'message': 'SucessFully Deleted'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5050)