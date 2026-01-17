import os
import django
from django.conf import settings
from api.mongo import get_collection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', "quiz_backend.settings")
django.setup()

if __name__ == "__main__":
    collection = get_collection("quizzes")
    print(collection)