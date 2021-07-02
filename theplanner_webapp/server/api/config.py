from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import datetime,timedelta


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///theplanner_db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config["JWT_SECRET_KEY"] ="JDJ5JDEyJHZLNmRkRjJtNWoveFhZMWtuZnpibGVYT3kzTkxFYnZDUXFDL1JaZU43OXR0ek5Qc0ZleEl5IA=="
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =timedelta(days=10)
db=SQLAlchemy(app)
ma=Marshmallow(app)
jwt = JWTManager(app)
bcy=Bcrypt(app)


