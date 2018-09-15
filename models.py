import os, sys
from postgres import db
from flask import json
from flask_sqlalchemy import SQLAlchemy
# from app import app

class UltimateTodo(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True)
    email = db.Column(db.String())
    password = db.Column(db.String())
    userName = db.Column(db.String())
    age = db.Column(db.String())
    gender= db.Column(db.String())
    joiningdate = db.Column(db.String())

    def __init__(self, id, email, password, userName, age, gender, joiningdate):
        self.email = email
        self.password = password
        self.id = id
        self.userName = userName
        self.age = age
        self.gender = gender
        self.joiningdate = joiningdate

    def __repr__(self):
        return '<id {}>'.format(self.id)