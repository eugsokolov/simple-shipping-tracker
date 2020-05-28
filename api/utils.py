import logging

from flask_app.app import app
from twilio.rest import TwilioException, Client as TwilioClient

from run import db
from models import Message


logger = logging.getLogger(__name__)


class CredNotFound(Exception):
    pass


def get_cred(name, default_value=None):
    # simple way to manage creds
    try:
        from . import creds
    except ImportError:
        raise CredNotFound("Try making a creds.py from template_creds.py!")

    if not hasattr(creds, name):
        raise Exception("Could not find {} in the creds module".format(name))

    return getattr(creds, name, "DEFAULT")


def send_sms(number, msg):
    if app.config.get("DEBUG"):
        print("Would send sms to {}: {}".format(number, msg))
        return True

    client = TwilioClient(get_cred("TWILIO_SID"), get_cred("TWILIO_AUTH_TOKEN"))

    # Twilio's api requires a plus
    user_num = "+{}".format(number)

    try:
        client.messages.create(
            to=user_num, from_=get_cred("TWILIO_FROM_NUMBER"), body=msg
        )
    except TwilioException as err:
        logger.error('Twilio Error: "{}"'.format(err))
        return False

    return True


def process_sms_request(form_dict):
    for i in ("phone", "message_id"):
        if i not in form_dict:
            raise ValueError("Must provide value {!r}".format(i))

    message = (
        db.session.query(Message).filter_by(pk=int(form_dict["message_id"])).first_or_404()
    )
    sent = send_sms(form_dict["phone"], message.body)
    return {"success": sent}
