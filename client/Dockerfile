FROM node:13

COPY . /code/
WORKDIR /code
#RUN apt-get install -y libpq-dev g++ make
#RUN bash /code/node-install-script.sh; apt-get install -y nodejs
RUN ls -al

RUN npm install
CMD ["npm", "init"]
CMD ["npm", "start"]
