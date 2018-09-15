import os
from flask import Flask, render_template, url_for, request, send_from_directory, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import Session
import models

app = Flask(__name__, static_folder="./dist", template_folder="./")

app.config.from_object(__name__)

# Postgresql Config

app.config['SQLALCHEMY_DATABASE_URI'] = 'ppostgres://rigxhjyv:uoO9zcWIPVanrB0F_YWbjKUwfNKqLFOH@pellefant.db.elephantsql.com:5432/rigxhjyv'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'dE\xad2g\x0c\x8d\xb9\x1cq\x86\x04:\xa8>\xc7\xc5\xc2Dr\xe7f\xf9\xeb'
db = SQLAlchemy(app)


@app.route('/')
def index():
    return render_template("index.html")

# Register User
@app.route('/registeruser', methods=['GET', 'POST'])
def registerUser():
    data = request.get_json(silent=True)
    userData = data["user"]
    print('data', userData['email'])
    email=userData['email']
    password=userData['password']
    userName=userData['userName']
    age=userData['age']
    gender=userData['gender']
    joiningdate=userData['joiningdate']    
    userRegister = models.UltimateTodo(
        1,
        email,
        password,
        userName,
        age,
        gender,
        joiningdate
    )
    db.session.add(userRegister)
    db.session.commit()
    return 'success'

@app.route('/loginuser', methods=['POST'])
def loginUser():
    data = request.get_json(silent=True)
    print("my data",data)

# If Route not found so redirect to index file
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5050)