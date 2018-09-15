from postgres import db
from sqlalchemy.dialects.postgresql import JSON


class UltimateTodo(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String())
    password = db.Column(db.String())
    email = db.Column(db.String())
    gender = db.Column(db.String())
    age = db.Column(db.String())
    joiningdate = db.Column(db.String())

    def __init__(self, userName, password, email, gender, age, joiningdate):
        self.userName = userName
        self.password = password
        self.email = email
        self.gender = gender
        self.age = age
        self.joiningdate = joiningdate

    def __repr__(self):
        return "<id {}>".format(self.id)

