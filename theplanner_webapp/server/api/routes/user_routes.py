from service.task_service import get_all
from sqlalchemy.sql.elements import Null
from routes import user_ctr
from flask import request,make_response,jsonify
from api.config import db,bcy
from api.model.task import taskSchema,Task
from flask_jwt_extended import create_access_token
from api.service.user_service import check_user,load_user_by_username,check_id,user_find_handler
import json
from api.service.auth_service import access_tk_required
from api.routes import  User,userSchema



@user_ctr.route('register',methods=['POST'])
def register():
  json=request.get_json()
  user=User(json['username'],json['email'],json['password'])
  res=check_user(User,user.username,user.email)
  if res!='':
    return make_response(res,409) 
  user.password=bcy.generate_password_hash(user.password)
  db.session.add(user)
  db.session.commit()
  return userSchema.dumps(user)

@user_ctr.route('login',methods=['POST'])
def login():
  json=request.get_json()
  user=load_user_by_username(User,json['username'])
  if user!=Null:
    check_password=bcy.check_password_hash(user.password,json['password'])
    response=make_response({'id':user.id,'username':user.username})
    response.set_cookie(key='access_token',value=create_access_token(identity=user.username),
    httponly=True,max_age=864000);return response if check_password else make_response('false password',403)
  return make_response('No user with username %s was found'%(json['username']))

@user_ctr.route('<user_id>/tasks')
@access_tk_required
@user_find_handler
def get_task(user_id):
  user=check_id(User,user_id)
  tasks=[json.loads(taskSchema.dumps(task)) for task in user.tasks]
  return jsonify(tasks=tasks)


@user_ctr.route('<user_id>/',methods=['DELETE'])
@access_tk_required
@user_find_handler
def delete_account(user_id):
  user=db.session.merge(check_id(User,user_id))
  db.session.delete(user)
  db.session.commit()
  return make_response(userSchema.dumps(user),200)


@user_ctr.route('<user_id>/extraction')
@access_tk_required
@user_find_handler
def extract_task(user_id):
  date=request.args.get('date')
  tasks=get_all(Task,date)
  return jsonify(tasks=[json.loads(taskSchema.dumps(task)) for task in tasks])
 


  