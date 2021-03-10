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

# Get the randomly generated id of this couch product
resp = requests.get(products_url, params={'name' : 'couch'})
couch = response_to_dict(resp)['products_list'][0]

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

# Get the randomly generated id of this monky product
resp = requests.get(products_url, params={'name' : 'monky'})
monky = response_to_dict(resp)['products_list'][0]

## Now for the tests ##

def test_find_all():
    expected = [couch, monky]
    actual = Product({}).find_all()
    assert actual == expected

def test_find_by_name():
    expected = [monky]
    actual = Product({}).find_by_name("monky")
    assert actual == expected

def test_find_by_category():
    expected = [monky]
    actual = Product({}).find_by_category("monke")
    assert actual == expected

def test_find_by_brand():
    expected = [monky]
    actual = Product({}).find_by_brand("moneky")
    assert actual == expected

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

def test_get_product_by_name():
    expected = {
        'products_list' : 
        [
            monky
        ]
    }

    resp = requests.get(products_url, params={'name' : 'monky'})
    actual = response_to_dict(resp)
    assert actual == expected

def test_post_new_product():
    banana = {
    'name' : 'banana',
    'price' : '4000000000000000000000',
    'quantity' : '1',
    'category' : 'fr00t',
    'brand' : 'bannna',
    'imageURL' : 'https://images.saatchiart.com/saatchi/798213/art/3108350/2178241-DHNIPQNJ-7.jpg'
    }

    resp = requests.post(products_url, json=banana)
    expect = response_to_dict(resp)

    resp = requests.get(products_url, params={'name' : 'banana'})
    actual = response_to_dict(resp)['products_list'][0]
    assert actual == expect

    requests.delete(products_url + f"/{actual['_id']}")

def test_get_product_by_id():
    expected = monky
    resp = requests.get(products_url + f"/{monky['_id']}")
    actual = response_to_dict(resp)
    assert actual == expected

def test_delete_product_by_id():
    expected = {
        'products_list' : 
        [
            monky
        ]
    }
    resp = requests.delete(products_url + f"/{couch['_id']}")
    resp = requests.get(products_url)
    actual = response_to_dict(resp)
    assert actual == expected

def test_remove():
    expected = []
    resp = Product(monky).remove()

    actual = Product({}).find_all()
    assert actual == expected

def test_remove_all():
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

    # Get the randomly generated id of this couch product
    resp = requests.get(products_url, params={'name' : 'couch'})
    couch = response_to_dict(resp)['products_list'][0]

    expected = []
    resp = Product({}).remove_all()

    actual = Product({}).find_all()
    assert actual == expected

def test_save():
    couch = {
        'name' : 'couch',
        'price' : '-100',
        'quantity' : '1',
        'category' : 'furniture',
        'brand' : 'couch',
        'imageURL' : 'https://media.istockphoto.com/photos/male-chimpanzee-in-business-clothes-picture-id143921869?k=6&m=143921869&s=612x612&w=0&h=l-fWW3E4eNumPU5AXbjvOmDRjomFMuaSrJEWRkBYNPk='
    }

    product = Product(couch)
    product.save()
    
    ls = product.find_all()
    actual = len(ls)
    expected = 1

    assert actual == expected
    product.remove_all()

def test_reload():
    couch = {
        'name' : 'couch',
        'price' : '-100',
        'quantity' : '1',
        'category' : 'furniture',
        'brand' : 'couch',
        'imageURL' : 'https://media.istockphoto.com/photos/male-chimpanzee-in-business-clothes-picture-id143921869?k=6&m=143921869&s=612x612&w=0&h=l-fWW3E4eNumPU5AXbjvOmDRjomFMuaSrJEWRkBYNPk='
    }

    does_exist_expect = False

    product = Product(couch)

    does_exist_actual = product.reload()

    assert does_exist_actual == does_exist_expect
