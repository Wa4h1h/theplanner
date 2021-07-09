FROM python:3.8-slim-buster
RUN mkdir rasa_theplanner
WORKDIR /rasa_theplanner
COPY . ./
RUN pip install virtualenv
RUN python3 -m venv rasa_init
CMD ["source","rasa_init/bin/activate"]
RUN pip3 install rasa
RUN pip install -U pip setuptools wheel
RUN pip install -U spacy
RUN python -m spacy download en_core_web_sm
RUN rasa train 
ENTRYPOINT ["bash","./commands.sh"]