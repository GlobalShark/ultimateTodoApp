
from flask import Flask, render_template, url_for, request, send_from_directory, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import flash
import json

app = Flask(__name__, static_folder="./dist", template_folder="./")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://jpnkmxpt:ELiJWfFAJPMoVgfIkXvsC0GpybtrNhhe@pellefant.db.elephantsql.com:5432/jpnkmxpt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'dE\xad2g\x0c\x8d\xb9\x1cq\x86\x04:\xa8>\xc7\xc5\xc2Dr\xe7f\xf9\xeb'

db = SQLAlchemy(app)


# Create User Table in Database Postgresql
class User(db.Model):
    # __tablename__='users'
    id = db.Column(db.Integer,primary_key=True)
    email = db.Column(db.String())
    password = db.Column(db.String())
    userName = db.Column(db.String())
    joiningdate = db.Column(db.String())
    todos=db.relationship('Todo',backref='user',lazy='dynamic')
    def __init__(self, email, password, userName, joiningdate):
        self.email = email
        self.password = password
        self.userName = userName
        self.joiningdate = joiningdate


    def __repr__(self):
        return '<id {}>'.format(self.id)

# Create Todo Table in Database 
class Todo(db.Model):
	    # __tablename__='todos'
    id=db.Column(db.Integer,primary_key=True)
    todo=db.Column(db.String())
    user_id= db.Column(db.Integer,db.ForeignKey('user.id'))

    def __init__(self,todo,user_id):
        self.todo=todo
        self.user_id=user_id


# Main Route   
@app.route('/')
def index():
    return render_template("index.html")

# User Registration Route
@app.route('/registeruser', methods=['GET', 'POST'])
def registerUser():
    data = request.get_json(silent=True)
    print(data)
    userData = data["user"]
    email=userData['email']
    password=userData['password']
    userName=userData['userName']
    joiningdate=userData['joiningdate']
    userRegister = User(
        email,
        password,
        userName,
        joiningdate
    )
    db.session.add(userRegister)
    db.session.commit()
    return 'success'

# Login User Data Save in Flask session
@app.route('/loginuser', methods=['GET','POST'])
def loginUser():
    data = request.get_json(silent=True)
    userData=data['user']
    email=userData['email']
    password=userData['password']
    userAuth='success'
    user=User.query.filter_by(email=email).first()
    print('user',user)
    if user:
        if user.password==password:
            session['logged_in'] = True
            userKey = user.id
            session['userKey'] = userKey
            userVal = {
            'userName' : user.userName,
            'email' : user.email,
            'joiningdate':user.joiningdate
            } 
            print("My user VAL SESSION",userVal) 
            session['userVal'] = userVal
            return'success'

# Logged IN User Flask Session Return Logged in User Data
@app.route('/logginUserData', methods=['GET'])
def loggedinUser():
    data = session
    dataUid = data['userKey']
    datareq = data['userVal']
    userVal = {
        'email': datareq['email'],
        'userName': datareq['userName'],
        'joiningdate':datareq['joiningdate'],
        'uid':dataUid
    }
    return jsonify(userVal)

# Logout User
@app.route('/logoutUser', methods=['POST'])
def logoutUser():
    data = session
    logout = request.get_json(silent=True)
    session.clear()
    return 'Sucesfully logout'


# Add Todo
@app.route('/addTodo', methods=['GET', 'POST'])
def addTodos():
    data = request.get_json(silent=True)
    userData = data["data"]
    todo=userData['typedTodo'],
    user_id=userData['uid'],
    print("user_id",user_id)
    u=Todo(todo,user_id)
    db.session.add(u)
    db.session.commit()
    return 'perfect'


# Fetch Todo Api V1.0
@app.route('/fetchtodoapi/v1.0', methods=['GET','POST'])
def fecthTodo():
    user=Todo.query.filter_by(user_id=session['userKey']).all()
    mydata = []
    for u in user:
        val={'todo':u.todo}
        mydata.append(val)
    return jsonify(mydata)

# Update Delete
@app.route('/update', methods=['PUT'])
def update():
    data=request.get_json(silent=True)
    userData = data["data"]
    updateTodo = userData["updateTodo"]
    previousTodo  = userData['previousTodo']
    id = userData['uid']
    user=Todo.query.filter_by(user_id=id,todo=previousTodo).first()
    user.todo=updateTodo
    db.session.commit()
    return 'updated'

# Delete  Todo
@app.route('/delete', methods=['DELETE'])
def delete():
    data=request.get_json(silent=True)
    id = data['uid']
    todo= data['val']
    user=Todo.query.filter_by(user_id=id,todo=todo).first()
    db.session.delete(user)
    db.session.commit()
    return "Deleted"

# Default Route
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

# Server Run on a port 5050
if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0',debug=True, port=5050 )