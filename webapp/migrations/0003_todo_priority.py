# Generated by Django 2.0.4 on 2018-05-06 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0002_todo'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='priority',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
