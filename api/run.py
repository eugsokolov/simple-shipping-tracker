""" The main Flask application file that bootstraps and starts the app. """

import os

from bootstrap import app_factory

app = app_factory()


@app.route("/health-check")
def health_check():
    return {"success": True}


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG", False))
