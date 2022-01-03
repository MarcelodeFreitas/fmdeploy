FROM python:3.7.7

WORKDIR /fmdeploy

COPY ./requirements.txt /fmdeploy/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /fmdeploy/requirements.txt

COPY ./app /fmdeploy/app

EXPOSE 8000

RUN apt-get update -y && apt-get install -y --no-install-recommends build-essential gcc \libsndfile1 

RUN apt-get install libsndfile1

RUN apt-get install ffmpeg

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]