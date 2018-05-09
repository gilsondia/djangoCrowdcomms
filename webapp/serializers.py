from rest_framework import serializers
from . models import User, Todo

class userSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields='__all__'

class todoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields='__all__'

