import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    # SQLALCHEMY_DATABASE_URI = 'postgresql:///{}'.format(os.environ['PGDATABASE'])
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgres://{user}:{password}@{host}:{port}/{database}'.format(
        user=os.environ['PGUSER'], password=os.environ['PGPASSWORD'], host=os.environ['PGHOST'], port='5432',
        database=os.environ['PGDATABASE'])
    os.environ['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True