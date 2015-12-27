# -*- coding: utf-8 -*-
from django.shortcuts import render,render_to_response

# Create your views here.

from django.http import HttpResponse,HttpResponseRedirect

from Tell.models import Item
from .forms import AddForm

def index(request):
	return render(request,'index.html')

def hello(request,name):
    number = len(name)
    context = {}
    context['dying'] = 1
    context['name'] = name
    context['num'] = number
    context['item'] = Item.objects.all()
    return render(request, 'hello.html', context)

def bye(request):
    return HttpResponseRedirect("/")

def add(request):
    return render(request, 'add.html')

def jia(request):
    a = request.GET['a']
    b = request.GET['b']
    a = int(a)
    b = int(b)
    return HttpResponse(str(a+b))

def form(request):
    if request.method == 'POST':# 当提交表单时
     
        form = AddForm(request.POST) # form 包含提交的数据
         
        if form.is_valid():# 如果提交的数据合法
            a = form.cleaned_data['a']
            b = form.cleaned_data['b']
            return HttpResponse("Your expected death age : "+str(int(a) + int(b)))
     
    else:# 当正常访问时
        form = AddForm()
    return render(request, 'form.html', {'form': form})

from django.views.generic import ListView
class ListObj(ListView):
    model=Item

def page_not_found(request):
    return render_to_response('Error/40X.html')

def page_error(request):
    return render_to_response('Error/50X.html')