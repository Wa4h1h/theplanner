from config import db,ma


class Task(db.Model):
  id=db.Column(db.Integer,primary_key=True)
  title=db.Column(db.String(80),nullable=True)
  start_time=db.Column(db.Integer,nullable=True)
  end_time=db.Column(db.Integer,nullable=True)
  date=db.Column(db.Date, nullable=True)
  state=db.Column(db.Boolean,nullable=True)
  user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)

  def __repr__(self) :
      return 'title %s'%(self.title)

class TaskSchema(ma.Schema):
  class Meta:
    fields=('title','start_time','end_time','date','state','user_id')

taskSchema=TaskSchema()


