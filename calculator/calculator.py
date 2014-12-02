import os

from flask import Flask, render_template
from flask.ext.restful import Api

from resources import *


app = Flask(__name__)


@app.route("/")
def calculator():
    return render_template('calculator.html')

api = Api(app)

api.add_resource(Add, '/add')
api.add_resource(Subtract, '/subtract')
api.add_resource(Multiply, '/multiply')
api.add_resource(Divide, '/divide')
api.add_resource(SquareRoot, '/square_root')
api.add_resource(Percent, '/percent')
api.add_resource(SciNotation, '/sci_notation')

if __name__ == "__main__":
    if 'C9_USER' in os.environ:
        app.run(
            debug=True,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080))
        )
    else:
        app.run(debug=True)
