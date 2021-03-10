import pymongo
from bson import ObjectId

class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                { "_id": ObjectId(self._id) }, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result :
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp
    
    def remove_all(self):
        resp = self.collection.remove({})
        self.clear()
        return resp

class Product(Model):
    db_client = pymongo.MongoClient('localhost', 27017)
    collection = db_client["inventory"]["products_list"]

    def find_all(self):
        products = list(self.collection.find())
        for product in products:
            product["_id"] = str(product["_id"])
        return products

    def find_by_name(self, name):
        products = list(self.collection.find({"name": name}))
        for product in products:
            product["_id"] = str(product["_id"])
        return products

    def find_by_category(self, category):
        products = list(self.collection.find({"category" : category}))
        for product in products:
            product["_id"] = str(product["_id"])
        return products

    def find_by_brand(self, brand):
        products = list(self.collection.find({"brand" : brand}))
        for product in products:
            product["_id"] = str(product["_id"])
        return products

class Order(Model):
    db_client = pymongo.MongoClient('localhost', 27017)
    collection = db_client["orders"]["orders_list"]

    def find_all(self):
        orders = list(self.collection.find())
        for order in orders:
            order["_id"] = str(order["_id"])
        return orders

    def find_by_name(self, name):
        orders = list(self.collection.find({"name": name}))
        for order in orders:
            order["_id"] = str(order["_id"])
        return orders
