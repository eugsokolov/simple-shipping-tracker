from run import db

class Base(db.Model):

    def __repr__(self):
        if hasattr(self, 'pk'):
            return "<{} object - pk: {}>".format(self.__class__.__name__, self.pk)
        else:
            return object.__repr__(self)
