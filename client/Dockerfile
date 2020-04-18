FROM python:3

COPY . /code
RUN apt-get install -y libpq-dev g++ make
RUN bash /code/node-install-script.sh; apt-get install -y nodejs
WORKDIR /code
COPY requirements.txt /code/
RUN pip3 install -r requirements.txt
# Make default database

ENTRYPOINT ["bash"]
CMD ["/code/start-api-client.sh"]