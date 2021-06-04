from flask_jwt_extended.view_decorators import jwt_required
from marshmallow.fields import Boolean
from sqlalchemy.sql.base import NO_ARG
from api.model.task import Task,taskSchema
from api.model.user import User,userSchema
from routes import task_ctr
from flask import request
from api.config import db
from api.service.user_service import check_id
from api.service.task_service import check_task_id,task_find_handler
from api.service.auth_service import access_tk_required
from flask import make_response



@task_ctr.route('/',methods=['POST'])
@access_tk_required
def create_task():
  user_id=request.args.get('user')
  user_=check_id(User,user_id)
  if user_!=None:
    json_=request.get_json()
    user__=db.session.merge(user_)
    task=Task(**json_,user=user__)
    db.session.add(task)
    db.session.commit()
    return taskSchema.dumps(task)
  return make_response('User with id %d does not exist'%(int(user_id)),404)


@task_ctr.route('<task_id>',methods=['GET'])
@task_find_handler
@access_tk_required
def get_task(task_id):
  task=check_task_id(Task,task_id)
  return taskSchema.dumps(task)


@task_ctr.route('<task_id>/complete',methods=['PUT'])
@access_tk_required
@task_find_handler
def complete_task(task_id):
  task_=db.session.merge(check_task_id(Task,task_id))
  task_.state=True
  db.session.add(task_)
  db.session.commit()
  return make_response(taskSchema.dumps(task_),200)


@task_ctr.route('<task_id>/',methods=['DELETE'])
@access_tk_required
@task_find_handler
def delete_task(task_id):
  task=db.session.merge(check_task_id(Task,task_id))
  db.session.delete(task)
  db.session.commit()
  return make_response(taskSchema.dumps(task),200)


@task_ctr.route('<task_id>/wd',methods=['PUT'])
@access_tk_required
@task_find_handler
def change_task_wd(task_id):
  weekly=request.args.get('weekly')
  daily=request.args.get('daily')
  task=db.session.merge(check_task_id(Task,task_id))
  if weekly!=None:
    task.weekly=True if int(weekly)==0 else False
  if daily!=None:
    task.daily=True if int(daily)==0 else False
  db.session.add(task)
  db.session.commit()
  return make_response(taskSchema.dumps(task),200)

@task_ctr.route('<task_id>/title',methods=['PUT'])
@access_tk_required
@task_find_handler
def change_task_title(task_id):
  task_title=request.args.get('title')
  task=db.session.merge(check_task_id(Task,task_id))
  if task_title!=None:
    task.title=task_title
  db.session.add(task)
  db.session.commit()
  return make_response(taskSchema.dumps(task),200)









  

