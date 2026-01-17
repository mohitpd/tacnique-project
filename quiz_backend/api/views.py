import json
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from bson import ObjectId
from .mongo import get_collection



# Create your views here.
class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
class CreateQuizView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        # Logic to create a quiz
        if not request.user.is_staff:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            questions_data = json.loads(request.body.decode('utf-8'))

            quiz_document = {
                "questions": []
            }

            for question_data in questions_data:
                question = {
                    '_id': ObjectId(),
                    'question': question_data['question'],
                    'type': question_data['type'],
                }

                if question_data['type'] == 'MCQ' and 'options' in question_data:
                    question['options'] = question_data['options']
      
                quiz_document["questions"].append(question)

            quizzes_collection = get_collection("quizzes")
            result = quizzes_collection.insert_one(quiz_document)
            return Response({
                "id": str(result.inserted_id),
                "message": "Quiz created successfully"
            }, status=status.HTTP_201_CREATED)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON data"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListQuizzesView(APIView):
    def get(self, request):
        quizzes_collection = get_collection("quizzes")

        docs = []

        for q in quizzes_collection.find({}, {"questions.answer": 0}):
            q['id'] = str(q['_id'])
            for question in q.get('questions', []):
                question['id'] = str(question['_id'])
                del question['_id']
            docs.append(q)
        return Response(docs)
        