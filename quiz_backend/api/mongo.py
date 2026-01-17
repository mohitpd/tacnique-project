from pymongo import MongoClient
from django.conf import settings

_client = None

def get_db():
    global _client
    if _client is None:
        mongo_uri = settings.MONGO_URI
        print(mongo_uri)
        _client = MongoClient(settings.MONGO_URI)
        print(_client)
    return _client.get_database("quizzes")

def get_collection(name):
    return get_db()[name]