import os

from decimal import *
from flask import Flask, render_template, request
from flask.ext.restful import Resource, Api

app = Flask(__name__)
api = Api(app)


@app.route("/")
def calculator():
    return render_template('calculator.html')


class Add(Resource):

    def get(self):
        a = Decimal(request.args.get('a'))
        b = Decimal(request.args.get('b'))
        result = a + b
        return {'result': float(result)}


class Subtract(Resource):

    def get(self):
        a = Decimal(request.args.get('a'))
        b = Decimal(request.args.get('b'))
        result = a - b
        return {'result': float(result)}


class Multiply(Resource):

    def get(self):
        a = Decimal(request.args.get('a'))
        b = Decimal(request.args.get('b'))
        result = a * b
        return {'result': float(result)}


class Divide(Resource):

    def get(self):
        a = Decimal(request.args.get('a'))
        b = Decimal(request.args.get('b'))
        result = a / b
        return {'result': float(result)}


class SquareRoot(Resource):

    def get(self):
        a = Decimal(request.args.get('a'))
        result = a.sqrt()
        return {'result': float(result)}


class Percent(Resource):

    def get(self):
        a = Decimal(request.args.get('a'))
        b = Decimal(request.args.get('b'))
        result = (b / 100) * a
        return {'result': float(result)}

api.add_resource(Add, '/add')
api.add_resource(Subtract, '/subtract')
api.add_resource(Multiply, '/multiply')
api.add_resource(Divide, '/divide')
api.add_resource(SquareRoot, '/square_root')
api.add_resource(Percent, '/percent')

if __name__ == "__main__":
    if 'C9_USER' in os.environ:
        app.run(
            debug=True,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080))
        )
    else:
        app.run(debug=True)
