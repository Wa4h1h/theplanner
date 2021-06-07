from config import app,db
from api.model.user import User
from api.model.task import Task
from api.routes.user_routes import user_ctr
from api.routes.task_routes import task_ctr
from flask_cors import CORS

app.register_blueprint(user_ctr,url_prefix='/api/users/')
app.register_blueprint(task_ctr,url_prefix='/api/tasks/')
CORS(app,resources={r"/api/*": {"origins": "http://localhost:3000"}},supports_credentials=True)



if __name__=='__main__':
  db.create_all()
  app.run()