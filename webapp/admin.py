from django.contrib import admin
from .models import User
from .models import Todo

admin.site.register(User)
admin.site.register(Todo)
# Register your models here.
