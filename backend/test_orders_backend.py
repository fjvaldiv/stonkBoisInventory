from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from model_mongodb import Product, Order
import requests
import ast
import pytest

def response_to_dict(response):
    resp = response.content.decode('utf-8')
    resp = ast.literal_eval(resp)
    return resp

# Remove all products to ensure a clean db before testing
Order({}).remove_all()

# Uri to orders api
orders_url = "http://localhost:5000/orders"

# Add this specific couch order
couch = {
    'name' : 'couch',
    'quantity' : '1',
    'price' : '-100',
    'status' : 'shipped',
    'productIDs' : '420'
}

response = requests.post(orders_url, json=couch)

# Get the randomly generated id of this couch product
resp = requests.get(orders_url, params={'name' : 'couch'})
couch = response_to_dict(resp)['orders_list'][0]

# Add this specific monky order
monky = {
    'name' : 'monky',
    'quantity' : '1',
    'price' : '100000000000000',
    'status' : 'in transit',
    'productIDs' : '42'
}

response = requests.post(orders_url, json=monky)

# Get the randomly generated id of this monky product
resp = requests.get(orders_url, params={'name' : 'monky'})
monky = response_to_dict(resp)['orders_list'][0]

## Now for the tests ##

# Dummy test to familiarize with pytest
def test_initialize_db():
    dummy_test = True
    assert dummy_test == True

def test_find_all():
    expected = [couch, monky]
    actual = Order({}).find_all()
    assert actual == expected

def test_find_by_name():
    expected = [monky]
    actual = Order({}).find_by_name("monky")
    assert actual == expected

# Test a basic get request
def test_get_orders():
    expected = {
        'orders_list' : 
        [
            couch,
            monky
        ]
    }

    actual = requests.get(orders_url).content.decode('utf-8')
    actual = ast.literal_eval(actual)
    assert actual == expected

def test_get_order_by_name():
    expected = {
        'orders_list' : 
        [
            monky
        ]
    }

    resp = requests.get(orders_url, params={'name' : 'monky'})
    actual = response_to_dict(resp)
    assert actual == expected

def test_post_new_order():
    banana = {
    'name' : 'banana',
    'quantity' : '1',
    'price' : '4000000000000000000000',
    'status' : 'shipped',
    'productIDs' : '100'
    }

    resp = requests.post(orders_url, json=banana)
    expect = response_to_dict(resp)

    resp = requests.get(orders_url, params={'name' : 'banana'})
    actual = response_to_dict(resp)['orders_list'][0]
    assert actual == expect

    requests.delete(orders_url + f"/{actual['_id']}")

def test_get_order_by_id():
    expected = monky
    resp = requests.get(orders_url + f"/{monky['_id']}")
    actual = response_to_dict(resp)
    assert actual == expected

def test_delete_order_by_id():
    expected = {
        'orders_list' : 
        [
            monky
        ]
    }
    resp = requests.delete(orders_url + f"/{couch['_id']}")
    resp = requests.get(orders_url)
    actual = response_to_dict(resp)
    assert actual == expected
