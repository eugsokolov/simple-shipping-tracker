import pytest

from models import Message

# TODO actually finish and have tests them pass


def test_product_simple(p1):
    assert p1.name == "test1"
    assert p1.price == 1.0
    assert p1.description == "description 1"
    assert p1.to_dict() == {
        "pk": 1,
        "name": "test1",
        "price": 1.0,
        "description": "description 1",
    }


def test_message_simple(t1):
    assert t1.body == "order received"
    assert t1.message_type == "received"
    assert t1.to_dict() == {
        "pk": 1,
        "body": "order received",
        "message_type": "received",
    }


def test_message_type_bad():
    with pytest.raises(ValueError):
        Message("name", "bad-message-type", 1)
