from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:03142108238@localhost/todoapp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'dE\xad2g\x0c\x8d\xb9\x1cq\x86\x04:\xa8>\xc7\xc5\xc2Dr\xe7f\xf9\xeb'

db = SQLAlchemy(app)

# User Table
class ultimateTodo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String)
    email=db.Column(db.String)
    password=db.Column(db.String)
    gender=db.Column(db.String)
    age=db.Column(db.Integer)
    joiningdate=db.Column(db.String)


@app.route('/')
def index():
    return render_template('register.html')


if __name__ == '__main__':
    db.create_all()

    app.run(debug=True)