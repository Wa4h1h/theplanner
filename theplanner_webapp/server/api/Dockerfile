FROM python:3.8-slim-buster
RUN mkdir backend_theplanner
WORKDIR /backend_theplanner
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
RUN apt-get update 
RUN apt-get install sqlite3
COPY . ./
ENTRYPOINT [ "python","main.py" ]