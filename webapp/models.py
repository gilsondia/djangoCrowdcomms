from django.db import models


class User(models.Model):
    userId = models.IntegerField
    userName = models.CharField(max_length=30)

    def __str__(self):
        return self.userName