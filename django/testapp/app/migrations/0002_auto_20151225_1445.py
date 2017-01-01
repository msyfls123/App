# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import ckeditor.fields


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='content',
            field=ckeditor.fields.RichTextField(default=b'', verbose_name=b'\xe6\xad\xa3\xe6\x96\x87'),
        ),
        migrations.AddField(
            model_name='data',
            name='img',
            field=models.ImageField(default=b'', upload_to=b'uploads/%Y/%m/'),
        ),
    ]
