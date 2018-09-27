
from flask import Flask, render_template, url_for, request, send_from_directory, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import flash

app = Flask(__name__, static_folder="./dist", template_folder="./")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://mmkiugcs:n3hbDSMWDeclA74Z_z0g-tsBhXTEIEQp@elmer.db.elephantsql.com:5432/mmkiugcs'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'dE\xad2g\x0c\x8d\xb9\x1cq\x86\x04:\xa8>\xc7\xc5\xc2Dr\xe7f\xf9\xeb'

db = SQLAlchemy(app)



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

class Todo(db.Model):
	    # __tablename__='todos'
    id=db.Column(db.Integer,primary_key=True)
    todo=db.Column(db.String())
    user_id= db.Column(db.Integer,db.ForeignKey('user.id'))

    def __init__(self,todo,user_id):
        self.todo=todo
        self.user_id=user_id


   
@app.route('/')
def index():
    return render_template("index.html")
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
    print('eeee',userRegister)
    db.session.add(userRegister)
    db.session.commit()
    return 'success'

@app.route('/loginuser', methods=['GET','POST'])
def loginUser():
    data = request.get_json(silent=True)
    print('username',data)
    print(data)
    userData=data['user']
    # userName=userData['userName']
    email=userData['email']
    password=userData['password']
    # joiningdate=userData['joiningdate']
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
    print('CHECK DATAA',data['userVal'])
        
    return jsonify(userVal)

@app.route('/logoutUser', methods=['POST'])
def logoutUser():
    data = session
    logout = request.get_json(silent=True)
    session.clear()
    print('My logout', logout, 'My session', session)
    return 'Sucesfully logout'



@app.route('/addTodo', methods=['GET', 'POST'])
def addTodos():
    data = request.get_json(silent=True)
    print("My data",data)
    userData = data["addTodo"]
    # print('my todo',userData['uid'])
    # if userData['uid'] == session['userKey']:
        # print(userData['uid'],session['userKey'])
    todo=userData['typedTodo'],
    user_id=userData['uid'],
    print("user_id",user_id)
    u=Todo(todo,user_id)     
       
    db.session.add(u)
    db.session.commit()
    return 'perfect'

    # else:
    #     return False
    # print('mu data',userData,'sessionkey',session['userKey'],'my user val',userVal)


@app.route('/fetchtodoapi/v1.0', methods=['GET','POST'])
def fecthTodo():
    data = request.get_json(silent=True)
    print('fetch',data)
    userData = data["user"]
    email = userData['email']
    password = userData['password']
    # ref = db.reference('ultimateTodo/users')
    # refData = ref.get()
    # mydata = {}
    # for key, val in refData.items():
    #         jsonVal = jsonify(val)
    #         mydata = val
    #         print('fecthing datatatat', val)
    user=Todo.query.filter_by(user_id=user_id).all()
    val={'todo':user.todo}  
    my_data=val
    print('fatching')

    # else:
    #         print('false')
    # #   print(val['email'])
    # # print(ref.get())
    # return val

@app.route('/update')
def update():
    data=request.get_json(silent=True)
    user=Todo.query.filter_by(id=id).first()
    user.todo='opoopopop'
    db.session.commit()
@app.route('/delete')
def delete():
    data=request.get_json(silent=True)
    user=Todo.query.filter_by(id=id).first()
    db.session.delete(user)
    db.session.commit()
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0',debug=True, port=5050 )