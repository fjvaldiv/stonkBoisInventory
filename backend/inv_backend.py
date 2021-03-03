from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from backend.model_mongodb import Product, Order


app = Flask(__name__)

#CORS stands for Cross Origin Requests.
CORS(app) #Here we'll allow requests coming from any domain. Not recommended for production environment.

products = {
    'products_list' :
    [
        {
            'name' : 'couch',
            'price' : '-100',
            'quantity' : '1',
            'category' : 'furniture',
            'description' : 'dis a couch',
            'brand' : 'couch brand',
            'productID' : '420',
            'picture' : 'hi'
        }
    ]
}

@app.route('/')
def hello_world():
    return 'Hello, world!'

@app.route('/products', methods=['GET', 'POST'])
def get_products():
    if request.method == 'GET':
        search_productName = request.args.get('name')
        if search_productName:
            result = Product().find_by_name(search_productName)
        else:
            result = Product().find_all()
        return {"products_list": result}
    elif request.method == 'POST':
        productToAdd = request.get_json()
        newProduct = Product(productToAdd)
        newProduct.save()
        resp = jsonify(newProduct), 201
        return resp

@app.route('/orders', methods=['GET', 'POST'])
def get_orders():
    if request.method == 'GET':
        search_orderName = request.args.get('name')
        if search_orderName:
            result = Order().find_by_name(search_orderName)
        else:
            result = Order().find_all()
        return {"orders_list": result}
    elif request.method == 'POST':
        orderToAdd = request.get_json()
        newOrder = Order(orderToAdd)
        newOrder.save()
        resp = jsonify(newOrder), 201
        return resp

@app.route('/products/<id>', methods = ['DELETE'])
def get_product(id):
    if request.method == 'GET':
        product = Product({"_id":id})
        if product.reload() :
            return product
        else :
            return jsonify({"error": "Product not found"}), 404
    elif request.method == 'DELETE':
        product = Product({"_id":id})
        resp = product.remove()
        if resp['n'] != 1:
            return {}, 404
        return {}, 204

