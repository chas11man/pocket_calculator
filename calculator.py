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

api.add_resource(Add, '/add')

if __name__ == "__main__":
    app.run(debug=True)
