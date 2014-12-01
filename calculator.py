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
        a = request.args.get('a')
        b = request.args.get('b')
        result = Decimal(a) + Decimal(b)
        return {'result': float(result)}

class Subtract(Resource):
    def get(self):
        a = request.args.get('a')
        b = request.args.get('b')
        result = Decimal(a) - Decimal(b)
        return {'result': float(result)}

class Multiply(Resource):
    def get(self):
        a = request.args.get('a')
        b = request.args.get('b')
        result = Decimal(a) * Decimal(b)
        return {'result': float(result)}

class Divide(Resource):
    def get(self):
        a = request.args.get('a')
        b = request.args.get('b')
        result = Decimal(a) / Decimal(b)
        return {'result': float(result)}

class Negative(Resource):
    def get(self):
        a = request.args.get('a')
        result = Decimal(a) * -1
        return {'result': float(result)}

api.add_resource(Add, '/add')
api.add_resource(Subtract, '/subtract')
api.add_resource(Multiply, '/multiply')
api.add_resource(Divide, '/divide')
api.add_resource(Negative, '/negative')

if __name__ == "__main__":
    if 'C9_USER' in os.environ:
        app.run(
            debug=True,
            host=os.getenv('IP', '0.0.0.0'),
            port=int(os.getenv('PORT', 8080))
        )
    else:
        app.run(debug=True)
