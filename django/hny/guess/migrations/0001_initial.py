# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Polls',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Choice1', models.CharField(max_length=30, blank=True)),
                ('Choice2', models.CharField(max_length=30, blank=True)),
                ('Choice3', models.CharField(max_length=30, blank=True)),
                ('Alipay', models.CharField(unique=True, max_length=30)),
                ('CheckName', models.CharField(unique=True, max_length=20)),
                ('Applytime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
