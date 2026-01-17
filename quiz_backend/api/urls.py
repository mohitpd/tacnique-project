from django.urls import path

from .views import AdminLoginView, CreateQuizView, ListQuizzesView

urlpatterns = [
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/quizzes/', CreateQuizView.as_view(), name='create-quiz'),
    path('quizzes/list/', ListQuizzesView.as_view(), name='list-quizzes'), 
]