# -*- coding:utf-8 -*-
from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
class Data(models.Model):
	name = models.CharField(max_length=50)
	data = models.TextField(max_length=500)
	content = RichTextField('正文',default="")
	img = models.ImageField(upload_to="uploads/%Y/%m/",default="")

class Notes(models.Model):
	tip = models.CharField(verbose_name = u'名字',max_length=50)
	time = models.TimeField(verbose_name = u'时间',)

	def __unicode__(self):
		return self.tip

	class Meta:
		verbose_name = u'笔记'
		verbose_name_plural = u'笔记'