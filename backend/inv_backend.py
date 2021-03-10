from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from backend.model_mongodb import Product, Order

app = Flask(__name__)

#CORS stands for Cross Origin Requests.
CORS(app) #Here we'll allow requests coming from any domain. Not recommended for production environment.

@app.route('/')
def hello_world():
    return 'Hello, world!'

@app.route('/products', methods=['GET', 'POST'])
def get_products():
    if request.method == 'GET':
        search_productName = request.args.get('name')
        search_productCategory = request.args.get('category')
        search_productBrand = request.args.get('brand')
        search_productPrice = request.args.get('price')
        if search_productName:
            result = Product().find_by_name(search_productName)
        elif search_productCategory:
            result = Product().find_by_category(search_productCategory)
        elif search_productBrand:
            result = Product().find_by_brand(search_productBrand)
        elif search_productPrice:
            result = Product().find_by_price(search_productPrice)
        else:
            result = Product().find_all()
        return {"products_list": result}
    elif request.method == 'POST':
        productToAdd = request.get_json()
        newProduct = Product(productToAdd)
        newProduct.save()
        resp = jsonify(newProduct), 201
        return resp

@app.route('/products/<id>', methods = ['GET', 'DELETE'])
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

@app.route('/orders', methods=['GET', 'POST'])
def get_orders():
    if request.method == 'GET':
        search_orderName = request.args.get('name')
        search_orderStatus = request.args.get('status')
        search_orderQuantity = request.args.get('quantity')
        search_orderPrice = request.args.get('price')
        search_orderProductID = request.args.get('productID')
        if search_orderName:
            result = Order().find_by_name(search_orderName)
        elif search_orderStatus:
            result = Order().find_by_status(search_orderStatus)
        elif search_orderQuantity:
            result = Order().find_by_quantity(search_orderQuantity)
        elif search_orderPrice:
            result = Order().find_by_price(search_orderPrice)
        elif search_orderProductID:
            result = Order().find_by_productID(search_orderProductID)
        else:
            result = Order().find_all()
        return {"orders_list": result}
    elif request.method == 'POST':
        orderToAdd = request.get_json()
        newOrder = Order(orderToAdd)
        newOrder.save()
        resp = jsonify(newOrder), 201
        return resp

@app.route('/orders/<id>', methods = ['GET', 'DELETE'])
def get_order(id):
    if request.method == 'GET':
        order = Order({"_id":id})
        if order.reload() :
            return order
        else :
            return jsonify({"error": "Order not found"}), 404
    elif request.method == 'DELETE':
        order = Order({"_id":id})
        resp = order.remove()
        if resp['n'] != 1:
            return {}, 404
        return {}, 204
