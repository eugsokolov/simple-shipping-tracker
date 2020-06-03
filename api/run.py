""" The main Flask application file that bootstraps and starts the app. """
import os

from bootstrap import app_factory
from flask import request, jsonify

from models import Product, Template, Message
from utils import process_sms_request

app = app_factory()

# TODO implement login system
# TODO implement DELETE and PUT for all below
# TODO break out to views.py and use flask_restful.Api


@app.route("/products", methods=["GET"])
def list_products():
    return jsonify(products=[i.to_dict() for i in Product.query.all()])


@app.route("/products", methods=["POST"])
def create_product():
    item = Product(
        request.json["name"], request.json["price"], request.json["description"]
    )
    app.db.session.add(item)
    app.db.session.commit()
    return item.to_dict()


@app.route("/templates", methods=["GET"])
def list_templates():
    return jsonify(templates=[i.to_dict() for i in Template.query.all()])


@app.route("/templates", methods=["POST"])
def create_template():
    item = Template(request.json["body"], request.json["message_type"])
    app.db.session.add(item)
    app.db.session.commit()
    return item.to_dict()


@app.route("/messages", methods=["GET"])
def list_messages():
    return jsonify(messages=[i.to_dict() for i in Message.query.all()])


@app.route("/messages", methods=["POST"])
def create_message():
    item = Message(
        request.json["version"],
        request.json["product_id"],
        request.json["template_id"],
    )
    app.db.session.add(item)
    app.db.session.commit()
    return item.to_dict()


@app.route("/sms", methods=["POST"])
def sms():
    return process_sms_request(request.json)


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG", False))
