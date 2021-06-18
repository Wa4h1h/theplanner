from flask import make_response
from model.task import Task
from datetime import datetime

def check_task_id(Task,id):
  task=Task.query.filter_by(id=id).first()
  return task

def get_all(Task,date):
  return Task.query.filter_by(date=datetime.strptime(date,"%Y-%m-%d")).all()


def task_find_handler(req):
  def handler(**kwargs):
    task=check_task_id(Task,kwargs['task_id'])
    if task!=None:
      return req(**kwargs)
    return make_response('Task with id %d does not exist'%(int(kwargs['task_id'])),404)
  handler.__name__ = req.__name__
  return handler


def change_task(task,task_):
  task.title=task_.title
  task.start_time=task_.start_time
  task.end_time=task_.end_time
  task.date=task_.date
  return task