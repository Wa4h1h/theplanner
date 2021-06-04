from flask import make_response
from api.model.task import Task

def check_task_id(Task,id):
  task=Task.query.filter_by(id=id).first()
  return task


def task_find_handler(req):
  def handler(**kwargs):
    task=check_task_id(Task,kwargs['task_id'])
    if task!=None:
      return req(**kwargs)
    return make_response('Task with id %d does not exist'%(int(kwargs['task_id'])),404)
  handler.__name__ = req.__name__
  return handler