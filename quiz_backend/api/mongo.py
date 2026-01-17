from pymongo import MongoClient
from django.conf import settings

_client = None

def get_db():
    global _client
    if _client is None:
        _client = MongoClient(settings.MONGO_URI)
    return _client.get_default_database()

def get_collection(name):
    return get_db()[name]