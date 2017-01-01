# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Tell', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.ImageField(default=datetime.datetime(2015, 12, 22, 5, 52, 39, 230000, tzinfo=utc), upload_to=b'item'),
            preserve_default=False,
        ),
    ]
