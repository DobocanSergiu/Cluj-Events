# api.py
from bson import ObjectId
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['Database']
collection = db['Events']

# API routes
@app.route('/api/getAll', methods=['GET'])
def get_all_data():
    data = list(collection.find({},{'_id': 0}))
    return jsonify(data)


@app.route('/api/removeId/<data_id>', methods=['DELETE'])
def delete_data(data_id):
    obj_id = ObjectId(data_id)
    collection.delete_one({'_id': obj_id})
    return jsonify({'message': 'Data deleted successfully'})

@app.route('/api/removeAll', methods=['DELETE'])
def remove_all():
    collection.delete_many({ })
    return jsonify({'message': 'All data removed successfully'})


if __name__ == '__main__':
    app.run(debug=True)
