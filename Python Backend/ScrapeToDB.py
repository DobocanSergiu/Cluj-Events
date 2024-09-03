import json
from pymongo import MongoClient

# Load your JSON file
with open('merged_event_details.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['Database']
collection = db['Events']
print('Deleting previous entries')
collection.delete_many({})
print('Adding new entries')
collection.insert_many(data)
client.close()


