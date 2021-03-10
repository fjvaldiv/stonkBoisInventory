from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from model_mongodb import Product, Order
# from backend.model_mongodb import Product, Order
import requests
import ast
import pytest

def response_to_dict(response):
    resp = response.content.decode('utf-8')
    resp = ast.literal_eval(resp)
    return resp

# Remove all products to ensure a clean db before testing
products_url = "http://localhost:5000/products"
product = Product({})
product.remove_all()

# Add this specific couch product
couch = {
    'name' : 'couch',
    'price' : '-100',
    'quantity' : '1',
    'category' : 'furniture',
    'brand' : 'couch',
    'imageURL' : 'https://media.istockphoto.com/photos/male-chimpanzee-in-business-clothes-picture-id143921869?k=6&m=143921869&s=612x612&w=0&h=l-fWW3E4eNumPU5AXbjvOmDRjomFMuaSrJEWRkBYNPk='
}

response = requests.post(products_url, json=couch)
print(response)

# Get the randomly generated id of this couch product
resp = requests.get(products_url, params={'name' : 'couch'})
couch = response_to_dict(resp)['products_list'][0]
print(couch)

# Add this specific monky product
monky = {
    'name' : 'monky',
    'price' : '100000000000000',
    'quantity' : '1',
    'category' : 'monke',
    'brand' : 'moneky',
    'imageURL' : 'https://zoo.sandiegozoo.org/sites/default/files/2019-01/thumb-allensswampmonkey.jpg'
}

response = requests.post(products_url, json=monky)
print(response)

# Get the randomly generated id of this monky product
resp = requests.get(products_url, params={'name' : 'monky'})
monky = response_to_dict(resp)['products_list'][0]
print(monky)

## Now for the tests ##

# Dummy test to familiarize with pytest
def test_initialize_db():
    dummy_test = True
    assert dummy_test == True

# Test a basic get request
def test_get_products():
    expected = {
        'products_list' : 
        [
            couch,
            monky
        ]
    }

    actual = requests.get(products_url).content.decode('utf-8')
    actual = ast.literal_eval(actual)
    assert actual == expected

def test_get_by_name():
    expected = {
        'products_list' : 
        [
            monky
        ]
    }

    actual = requests.get(products_url, params={'name' : 'monky'}).content.decode('utf-8')
    print(actual)

if __name__ == '__main__':
    test_get_by_name()
