# Generated by Django 2.0.4 on 2018-05-06 12:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0003_todo_priority'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
