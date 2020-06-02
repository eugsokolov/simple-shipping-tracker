import pytest

from models import Product, Message, Template


@pytest.fixture
def p1():
    return Product("test1", 1.0, "description 1")


@pytest.fixture
def p2():
    return Product("test2", 2.0, "description 2")


@pytest.fixture
def t1():
    return Template("order received", "received")


@pytest.fixture
def t2():
    return Template("order processing", "processing")


@pytest.fixture
def t3():
    return Template("order shipped", "shipping")


@pytest.fixture
def t4():
    return Template("order delivered", "delivered")


@pytest.fixture
def t5():
    return Template("thanks for your order", "received")


@pytest.fixture
def t6():
    return Template("check your mailbox", "delivered")


@pytest.fixture
def m1():
    return Message("1.0.0", 1, 1)


@pytest.fixture
def m2():
    return Message("2.0.0", 1, 1)


@pytest.fixture
def m3():
    return Message("1.0.0", 2, 1)
