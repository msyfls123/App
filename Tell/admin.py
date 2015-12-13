from django.contrib import admin

# Register your models here.
import models

class ItemAdmin(admin.ModelAdmin):
	list_display = ["title","amount"]

admin.site.register(models.Item,ItemAdmin)