from django.contrib import admin

# Register your models here.
import models

class PollAdmin(admin.ModelAdmin):
	list_display = ["CheckName","Choice1","Choice2","Choice3","Applytime"]
	list_filter = ('CheckName', 'Applytime')
	
admin.site.register(models.Polls,PollAdmin)