# -*- coding:utf-8 -*-
from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
class Data(models.Model):
	name = models.CharField(max_length=50)
	data = models.TextField(max_length=500)
	content = RichTextField('正文',default="")
	img = models.ImageField(upload_to="uploads/%Y/%m/",default="")