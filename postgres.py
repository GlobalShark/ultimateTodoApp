import os
from flask import Flask, request, send_from_directory, session, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


# Postgresql Config

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgres://rigxhjyv:uoO9zcWIPVanrB0F_YWbjKUwfNKqLFOH@pellefant.db.elephantsql.com:5432/rigxhjyv"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SECRET_KEY"
] = b"dE\xad2g\x0c\x8d\xb9\x1cq\x86\x04:\xa8>\xc7\xc5\xc2Dr\xe7f\xf9\xeb"
db = SQLAlchemy(app)

import models

# Register User
@app.route("/registeruser", methods=["GET", "POST"])
def registerUser():
    data = request.get_json(silent=True)
    userData = data
    print("data", userData["email"])
    email = userData["email"]
    password = userData["password"]
    userName = userData["userName"]
    age = userData["age"]
    gender = userData["gender"]
    joiningdate = userData["joiningdate"]
    userRegister = models.UltimateTodo(
        email, password, userName, age, gender, joiningdate
    )
    db.session.add(userRegister)
    db.session.commit()
    return "success"


@app.route("/get_users")
def get_users():
    _tasks = models.UltimateTodo.query.all()
    tasks = []

    # iterate tasks
    for task in _tasks:

        # append data in list
        tasks.append(
            {
                "id": task.id,
                "userName": task.userName,
                "password": task.password,
                "email": task.email,
                "age": task.age,
            }
        )
    return jsonify({"result": tasks}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5050)

