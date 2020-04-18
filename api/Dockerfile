FROM python:3

COPY . /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip3 install -r requirements.txt
# Make default database

ENTRYPOINT ["python"]
CMD ["/code/app.py"]

#FROM postgres:12
#
#COPY . /code
#WORKDIR /code
#RUN /etc/init.d/postgresql start
#
#ENTRYPOINT ["/usr/lib/postgresql/10/bin/pg_ctl"]
#CMD ["-D /var/lib/postgresql/10/main", "-l logfile", "start"]