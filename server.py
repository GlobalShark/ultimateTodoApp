
import os
from flask import Flask, render_template, url_for, request, send_from_directory, session, jsonify
import json
import firebase_admin
from firebase_admin import db, credentials, auth
from flask import Session

app = Flask(__name__, static_folder="./dist", template_folder="./")

app.config.from_object(__name__)

cred = credentials.Certificate("./firebaseauth.json")

# firebase_admin.initialize_app(cred)
firebase_admin.initialize_app(options={
    'databaseURL': 'https://ultimate-todo-app.firebaseio.com'
})

ultimateTodo = db.reference('ultimateTodo')
# secre key
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/registeruser', methods=['GET', 'POST'])
def registerUser():
    data = request.get_json(silent=True)
    userData = data["user"]
    # print('This is a data',data)
    print('data', userData['email'])
    user = auth.create_user(
        email=userData['email'],
        email_verified=False,
        password=userData['password'],
        display_name=userData['userName'],
        disabled=False
    )
    print('This is siggn up data', user)
    userDb = ultimateTodo.child('users').push(userData)
    return 'success'


@app.route('/loginuser', methods=['POST'])
def loginUser():
    data = request.get_json(silent=True)
    userData = data["user"]
    email = userData['email']
    password = userData['password']
    ref = db.reference('ultimateTodo/users')
    refData = ref.get()
    userAuth = 'success'
    for key, val in refData.items():
        if(email == val['email'] and password == val['password']):
            
            print('correct')
            userAuth = 'success'
            userVal = val
            userKey = key
            session['logged_in'] = True
            session['userKey'] = userKey
            session['userVal'] = userVal
            app.secret_key = userKey
            break
            print('This my user val', userVal, key, session)
        else:
            print('false')
            userAuth = 'notsuccess'
            session['logged_in'] = False
    #   print(val['email'])
    # print(ref.get())

    return userAuth


@app.route('/logginUserData', methods=['GET'])
def loggedinUser():
    data = session
    dataUid = data['userKey']
    datareq = data['userVal']
    userVal = {
        'email': datareq['email'],
        'username': datareq['userName'],
        'joiningdate': datareq['joiningdate'],
        'uid': dataUid
    }
    return jsonify(userVal)
# Logout User


@app.route('/logoutUser', methods=['POST'])
def logoutUser():
    data = session
    logout = request.get_json(silent=True)
    session.clear()
    print('My logout', logout, 'My session', session)
    return 'Sucesfully logout'


@app.route('/addtodos', methods=['GET', 'POST'])
def addTodos():
    data = request.get_json(silent=True)
    userData = data["user"]
    if userData['uid'] == session['userKey']:
        userVal = {
            'todo': userData['todo'],
            'description': userData['description']
        }
        # userVal = jsonify(userVal)
        userDb = ultimateTodo.child('users').child(session['userKey']).child('todos').push(userVal)
    else:
        return False
    # print('mu data',userData,'sessionkey',session['userKey'],'my user val',userVal)


@app.route('/fetchtodoapi/v1.0', methods=['GET','POST'])
def fecthTodo():
    data = request.get_json(silent=True)
    # userData = data["user"]
    # email = userData['email']
    # password = userData['password']
    ref = db.reference('ultimateTodo/users')
    refData = ref.get()
    mydata = {}
    for key, val in refData.items():
            jsonVal = jsonify(val)
            mydata = val
            print('fecthing datatatat', val)
            

    else:
            print('false')
    #   print(val['email'])
    # print(ref.get())
    return val



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


app.run(host='0.0.0.0', debug=True, port=5050)
