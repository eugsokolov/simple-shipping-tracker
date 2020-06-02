from sqlalchemy.orm import validates

from run import db

MESSAGE_TYPES = {"received", "processing", "shipping", "delivered", "post-delivery"}


class Product(db.Model):
    """Products for our website"""

    pk = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(120))

    messages = db.relationship("Message", back_populates="product")

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


class Message(db.Model):
    """Messages for our website"""

    __table_args__ = (db.UniqueConstraint("message_type", "product_id", "version"),)
    pk = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(120), nullable=False)
    message_type = db.Column(db.String, nullable=False)
    version = db.Column(db.String(5), nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey("product.pk"), nullable=False)
    product = db.relationship("Product", back_populates="messages")

    @validates("message_type")
    def validate_type(self, key, value):
        assert value in MESSAGE_TYPES
        return value

    def __init__(self, body, message_type):
        self.body = body
        self.message_type = message_type

    @property
    def sms_body(self):
        return "{}: {!r}".format(self.body, self.product)

    def to_dict(self):
        return {
            "pk": self.pk,
            "body": self.body,
            "message_type": self.message_type,
            "product_id": self.product_id,
        }


if __name__ == "__main__":
    # Run this file directly to create the database tables.
    from run import app

    print("Creating database tables...")
    db.create_all(app=app)
    print("Done!")
