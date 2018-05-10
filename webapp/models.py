from django.db import models
from datetime import datetime
from django.utils import timezone


class User(models.Model):
    userId = models.IntegerField
    userName = models.CharField(max_length=30)

    def __str__(self):
        return self.userName


class Todo(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    priority = models.IntegerField()
    deadline = models.DateTimeField()
    dateTodo = models.DateTimeField(default=timezone.now, blank=True)
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.title
