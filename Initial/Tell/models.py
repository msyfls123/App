from django.db import models

# Create your models here.
class Item(models.Model):
	title = models.CharField(max_length=200)
	description = models.TextField()
	amount = models.IntegerField()
	image = models.ImageField(upload_to="item")

	def __unicode__(self):
		return self.title