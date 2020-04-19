# Running Cart Application
* Build docker containers:
```bash
$ docker-compose build
```
* Run docker containers:
```bash
$ docker-compose up
``` 
* Load fixtures into postgres:
```bash
$ docker-compose run api python manage.py loaddata djangoapi/fixtures/default_setup.json
```

# Overview of Program
There are three components in the Shopping Cart program:
* Client - React UI
* API - Django API
* DB - Postgres database

In the docker-compose.yml, they are linked together and share the same ports with their host. The ports are:
* Client - 3000
* API - 8000
* DB - 5432