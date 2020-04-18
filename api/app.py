from os import environ
import json

from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

import config
import models

app = Flask(__name__)
app.config.from_object(config.TestingConfig)
CORS(app)
db = SQLAlchemy(app)


@app.route('/')
def hello_world():
    return {'test': 'Hello, World!'}


@app.route('/cart', methods=['GET'])
def view_cart():
    """
    Retrieve the default cart
    """
    return json.dumps([cart.__repr__() for cart in db.session.query(models.Cart).all()])


@app.route('/cart', methods=['POST'])
def update_cart():
    """
    Retrieve the default cart
    """
    if request.is_json:
        data = request.get_json()
        model = models.Cart(**data)
        db.session.add(model)
        db.session.commit()
        return data
    else:
        return {'error': 'Invalid JSON payload.'}


@app.route('/cart/<cart>/item/<item>')
def add_item(cart, item):
    pass


@app.route('/item', methods=['POST'])
def create_item(item):
    if request.is_json:
        data = request.get_json()
        model = models.Item(**data)
        db.session.add(model)
        db.session.commit()
        return data
    else:
        return {'error': 'Invalid JSON payload.'}


@app.route('/item', methods=['GET'])
def get_all_items():
    return json.dumps([item.__repr__() for item in db.session.query(models.Item).all()])


if __name__ == '__main__':
    db_uri = environ.get('SQLALCHEMY_DATABASE_URI')
    print('trying to connect to : {}'.format(db_uri))
    engine = create_engine(db_uri, echo=True)

    # Create All Tables
    # models.Base.metadata.create_all(engine)
    app.run(debug=True, host='0.0.0.0', port='5000')
