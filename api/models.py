from sqlalchemy.orm import validates

from bootstrap import db

MESSAGE_TYPES = {"received", "processing", "shipping", "delivered", "post-delivery"}

# TODO implement migration handling, alembic or flask-migrate


class Product(db.Model):
    """Products for our website"""

    pk = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(120))

    def __init__(self, name, price, description):
        self.name = name
        self.price = price
        self.description = description

    def __repr__(self):
        return "Product {} @ {}".format(self.name, self.price)

    def to_dict(self):
        return {
            "pk": self.pk,
            "name": self.name,
            "price": self.price,
            "description": self.description,
        }


class Template(db.Model):
    """Message templates for our website"""

    pk = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(120), nullable=False)
    message_type = db.Column(db.String, nullable=False)

    @validates("message_type")
    def validate_type(self, key, value):
        assert value in MESSAGE_TYPES
        return value

    def __init__(self, body, message_type):
        self.body = body
        self.message_type = message_type

    def to_dict(self):
        return {"pk": self.pk, "body": self.body, "message_type": self.message_type}


class Message(db.Model):
    """Messages for our website"""

    __table_args__ = (db.UniqueConstraint("version", "product_id", "template_id"),)
    pk = db.Column(db.Integer, primary_key=True)
    version = db.Column(db.String(5), nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey("product.pk"), nullable=False)
    product = db.relationship("Product", lazy=False)

    template_id = db.Column(db.Integer, db.ForeignKey("template.pk"), nullable=False)
    template = db.relationship("Template", lazy=False)

    def __init__(self, version, product_id, template_id):
        self.version = version
        self.product_id = product_id
        self.template_id = template_id

    @property
    def sms_body(self):
        return "{}: {!r}".format(self.template.body, self.product)

    def to_dict(self):
        return {
            "pk": self.pk,
            "version": self.version,
            "template_id": self.template_id,
            "product_id": self.product_id,
        }


if __name__ == "__main__":
    # Run this file directly to create the database tables.
    from flask import current_app as app

    print("Creating database tables...")
    with app.app_context():
        app.db.create_all(app=app)
    print("Done!")
