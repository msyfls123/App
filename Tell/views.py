from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

from Tell.models import Item

def hello(request,name):
	number = len(name)
	context = {}
	context['dying'] = 1
	context['name'] = name
	context['num'] = number
	context['item'] = Item.objects.all()
	return render(request, 'hello.html', context)

def bye(request):
	return HttpResponse('Good Bye')