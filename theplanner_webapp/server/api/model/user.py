from config import db,ma

class User(db.Model):
  
  id=db.Column(db.Integer,primary_key=True)
  username=db.Column(db.String(120), nullable=False)
  email=db.Column(db.String(120), nullable=False)
  password=db.Column(db.String(80),nullable=False)
  tasks=db.relationship('Task',backref='user',lazy=True)

  def __init__(self,username,email,password):
    self.username=username
    self.email=email
    self.password=password


class UserSchema(ma.Schema):
  class Meta:
    fields=('id','username','email')

userSchema=UserSchema()