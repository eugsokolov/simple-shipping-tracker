import pytest

from models import Template, Message, Product

# TODO actually finish and have tests them pass
# https://pypi.org/project/pytest-flask-sqlalchemy/


def test_app_creates(app):
    assert app


def test_product_simple(session):
    p1 = Product("test1", 1.0, "description 1")
    session.add(p1)
    session.commit()
    assert p1.name == "test1"
    assert p1.price == 1.0
    assert p1.description == "description 1"
    assert p1.to_dict() == {
        "pk": 1,
        "name": "test1",
        "price": 1.0,
        "description": "description 1",
    }


def test_message_simple(session):
    t1 = Template("order received", "received")
    session.add(t1)
    session.commit()
    assert t1.body == "order received"
    assert t1.message_type == "received"
    assert t1.to_dict() == {
        "pk": 1,
        "body": "order received",
        "message_type": "received",
    }


def test_message(session):
    m1 = Message("1.0.0", 1, 1)
    session.add(m1)
    session.commit()
    assert m1.to_dict() == {
        "pk": 1,
        "version": "1.0.0",
        "template_id": 1,
        "product_id": 1,
    }
    assert m1.product == session.query(Product).filter_by(pk=1).first()
    assert m1.template == session.query(Template).filter_by(pk=1).first()
    assert m1.sms_body == "order received: Product test1 @ 1.0"


def test_template_type_bad():
    with pytest.raises(AssertionError):
        Template("body", "bad-message-type")

    # with pytest.raises(AssertionError):
    #     Message("1", 1000000, 1)

    # with pytest.raises(AssertionError):
    #     Message("1", 1, 1000000)
