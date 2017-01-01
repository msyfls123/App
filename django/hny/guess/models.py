from django.db import models

# Create your models here.
class Polls(models.Model):
	Choice1 = models.CharField(blank=True, max_length=30)
	Choice2 = models.CharField(blank=True, max_length=30)
	Choice3 = models.CharField(blank=True, max_length=30)
	Alipay = models.CharField(unique=True, max_length=30)
	CheckName = models.CharField(unique=True, max_length=20)
	Applytime = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.CheckName
