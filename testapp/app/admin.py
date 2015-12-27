#-*- coding:utf-8 -*-
from django.contrib import admin

# Register your models here.
from .models import Data
from pagedown.widgets import AdminPagedownWidget
from django import forms

# Register your models here.
class DataForm(forms.ModelForm):
    contentPre = forms.CharField(label="Markdown编辑(不显示)",widget=AdminPagedownWidget())

    class Meta:
        model = Data
        fields = '__all__'

class DataAdmin(admin.ModelAdmin):
	list_display = ('name', 'data',)
	form = DataForm

admin.site.register(Data, DataAdmin)