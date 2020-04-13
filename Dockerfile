FROM python:3

COPY . /code
WORKDIR /code
COPY api/requirements.txt /code/
RUN pip3 install -r requirements.txt
COPY . /code/

ENTRYPOINT ["python"]
CMD ["api/app.py"]
