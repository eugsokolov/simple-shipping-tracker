from run import db


class User(db.Model):
    """Users for our website"""

    __tablename__ = 'user'

    pk = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    phone_number = db.Column(db.String)

    def check_password(self, password):
        # rudimentary password checker
        # storing a password in plaintext in the db is not good
        return self.password == password

    def __init__(self, email, password, first_name, last_name, phone_number):
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
