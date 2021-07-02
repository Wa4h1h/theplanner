import re
from service.user_service import load_user_by_username
from flask import request,jsonify,make_response
from flask_jwt_extended import decode_token
from model.user import User


def access_tk_required(req):
  def auth_deco(**kwargs):
    token=request.cookies.get('access_token')
    if token!='':
      if load_user_by_username(User,decode_token(token)['sub'])!=None:
        return req(**kwargs)
    return  make_response('unautherized',403)
  auth_deco.__name__ = req.__name__
  return auth_deco