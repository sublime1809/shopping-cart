FROM python:3

COPY . /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip3 install -r requirements.txt

#CMD ["python", "/code/manage.py", "runserver"]
ENTRYPOINT ["bash"]
CMD ["docker-entrypoint.sh"]
