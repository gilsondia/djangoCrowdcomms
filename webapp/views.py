from django.shortcuts import render
import logging
from django.http import HttpResponse
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import User, Todo
from . serializers import userSerializer
from . serializers import todoSerializer

logger = logging.getLogger('logger');
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

#list of task to-do.
class TodoList(APIView):
    #get to list all to-do
    def get(self,request):
        idParam =self.request.query_params.get('id',None)
        if idParam is not None:
            todoAux = Todo.objects.filter(id=idParam)
        else:
            todoAux = Todo.objects.order_by('-priority', 'deadline')

        serializer = todoSerializer(todoAux, many=True)
        return Response(serializer.data)

    #post to add new to-do
    def post(self, request):
        serializer = todoSerializer(data=request.data)
        try:
            #only priority lower than 4 and status lower than 3
            if serializer.is_valid() and int(request.data['priority'])<=4 and int(request.data['status'])<=3:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #put to update any to-do
    def put(self,request,id):

        todo = Todo.objects.get(pk=id)
        serializer = todoSerializer(todo,request.data)

        try:
            #only priority lower than 4 and status lower than 3
            if serializer.is_valid() and int(request.data['priority'])<=4 and int(request.data['status'])<=3:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IndexPageView(TemplateView):
    template_name = "pages/index.html"

class AboutPageView(TemplateView):
    template_name = "pages/about.html"

class EditTodoPageView(TemplateView):
    template_name = "pages/editTodo.html"

class modalAddTaskPageView(TemplateView):
    template_name = "pages/modal-add-task.html"

class modalEditTaskPageView(TemplateView):
    template_name = "pages/modal-edit-task.html"