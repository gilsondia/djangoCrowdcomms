from django.shortcuts import render

from django.http import HttpResponse
from django.views.generic import TemplateView
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import User, Todo
from . serializers import userSerializer
from . serializers import todoSerializer


class UserList(APIView):
    def get(self,request):
        userAux=User.objects.all()
        serializer=userSerializer(userAux, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        #let us see what can do later
        User.objects.get(id=request.data['id']).delete()
        return HttpResponse()

class TodoList(APIView):
    def get(self,request):
        todoAux=Todo.objects.order_by('-priority','deadline')
        serializer=todoSerializer(todoAux, many=True)
        return Response(serializer.data)

class HomePageView(TemplateView):
    template_name = "pages/index.html"

class AboutPageView(TemplateView):
    template_name = "pages/about.html"

class EditTodoPageView(TemplateView):
    template_name = "pages/editTodo.html"