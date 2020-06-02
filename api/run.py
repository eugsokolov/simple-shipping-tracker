""" The main Flask application file that bootstraps and starts the app. """
import os

from bootstrap import app_factory
from flask import request, jsonify


app = app_factory()
db = app.db

# with app.app_context():
#    db.create_all()  # Create database tables for our data models
#    db.session.commit()


# TODO implement login system
# TODO implement delete and put for all below
# TODO break out to views.py and use flask_restful.Api


@app.route("/products", methods=["GET", "POST"])
def list_products():
    from models import Product

    if request.method == "POST":
        item = Product(
            request.form["name"], request.form["price"], request.form["description"]
        )
        db.session.add(item)
        db.session.commit()
        return item
    else:
        return jsonify(
            products=[i.to_dict() for i in app.db.session.query(Product).all()]
        )


@app.route("/templates", methods=["GET", "POST"])
def list_messages():
    from models import Template

    if request.method == "POST":
        item = Template(request.form["body"], request.form["message_type"])
        db.session.add(item)
        db.session.commit()
        return item
    else:
        return jsonify(
            templates=[i.to_dict() for i in db.session.query(Template).all()]
        )


@app.route("/messages", methods=["GET", "POST"])
def view_message():
    from models import Message

    if request.method == "POST":
        item = Message(
            request.form["version"],
            request.form["product_id"],
            request.form["template_id"],
        )
        db.session.add(item)
        db.session.commit()
        return item
    else:
        return jsonify(
            messages=[i.to_dict() for i in app.db.session.query(Message).all()]
        )


@app.route("/sms", methods=["POST"])
def sms():
    from utils import process_sms_request

    return process_sms_request(request.json)


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG", False))
