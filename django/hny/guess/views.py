# -*- coding:utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
import datetime
# Create your views here.
from models import *
from django.contrib import messages
import json
from django.core.exceptions import ObjectDoesNotExist
from django.views import generic

#主视图
def index(request):
	curYear = datetime.datetime.now().year
	context = {}
	context["curYear"] = curYear
	return render(request,"index.html",context)

#表单视图
def guess(request):
	if request.method == "POST":
		choice1 = request.POST["choice1"]
		choice2 = request.POST["choice2"]
		choice3 = request.POST["choice3"]
		alipay = request.POST["alipay"]
		checkname = request.POST["checkname"]
		try:
			newPoll = Polls(Choice1=choice1,Choice2=choice2,Choice3=choice3,Alipay=alipay,CheckName=checkname)
			newPoll.save()
			alilen=len(alipay)-6
			alipayhid="".join([alipay[:3],"*"*alilen,alipay[-3:]])
			context={
				"choice1":choice1,
				"choice2":choice2,
				"choice3":choice3,
				"alipay":alipayhid,
				"checkname":checkname,
				"pollid":newPoll.id
			}
			return render(request,"result.html",context)
		except Exception, e:
			messages.warning(request, '你已经猜过了.')
			return HttpResponseRedirect(reverse("index"))
		else:
			pass
		finally:
			pass
	else : return render(request,"guess.html",{})

#结果视图
def result(request):
	alipay = request.GET.get("alipay")
	try:
		result = Polls.objects.get(Alipay=alipay)
		context={
				"id":result.id,
				"Choice1":result.Choice1,
				"Choice2":result.Choice2,
				"Choice3":result.Choice3,
				"Alipay":result.Alipay,
				"CheckName":result.CheckName,
		}
		return HttpResponse(json.dumps(context), content_type="application/json")
	except ObjectDoesNotExist:
		context = {}
		return HttpResponse(json.dumps(context), content_type="application/json")
		


#开奖视图
def final(request):
    curYear = datetime.datetime.now().year
    dataList = Polls.objects.all().order_by('Applytime')
    context = {}
    context["dataList"] = dataList
    context["curYear"] = curYear
    context["answers"] = [u"康熙王朝",u"大宋提刑官"]
    return render(request,"final.html",context)

#搜索视图
def serach(request):
	return render(request,"serach.html",{})