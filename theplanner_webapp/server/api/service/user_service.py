from service import User
from sqlalchemy.sql.elements import Null
from flask import make_response

def check_username(User,username_):
  query_user=User.query.filter_by(username=username_).all()
  return len(query_user)

def check_email(User,email_):
  query_user=User.query.filter_by(email=email_).all()
  return len(query_user)

def check_id(User,id_):
  query=User.query.filter_by(id=id_).first()
  return query;

def check_user(User,username,email):
  valid=''
  if check_username(User,username)!=0:
    valid+='username %s already exits '%(username)
  if check_email(User,email)!=0:
    valid+='email %s already exits '%(email)
  return valid

def load_user_by_username(User,username_):
  user=User.query.filter_by(username=username_).first()
  return user if user!=None else Null

def user_find_handler(req):
  def handler(**kwargs):
    user=check_id(User,kwargs['user_id'])
    if user!=None:
      return req(**kwargs)
    return make_response('User with id %d does not exist'%(int(kwargs['user_id'])),404)
  handler.__name__ = req.__name__
  return handler




