from decimal import *
from flask import request
from flask.ext.restful import Resource

__all__ = ['Add', 'Subtract', 'Multiply', 'Divide',
           'SquareRoot', 'Percent', 'SciNotation']


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


class SciNotation(Resource):

    def get(self):
        a = Decimal(request.args.get('a'))
        result = "{:.2e}".format(a)
        return {'result': result}
