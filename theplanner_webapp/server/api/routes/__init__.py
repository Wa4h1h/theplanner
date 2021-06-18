from flask import Blueprint
from model.user import User,userSchema


user_ctr=Blueprint('user_ctr',__name__)
task_ctr=Blueprint('task_ctr',__name__)