# -*- coding:utf-8 -*-
from django.shortcuts import render,render_to_response
from django.http import HttpResponse,Http404,HttpResponseRedirect
from django.views import generic
from django.contrib.auth.decorators import login_required  
from django.contrib import auth,messages
from django.template import loader, RequestContext 
from django.views.decorators.csrf import csrf_protect
from django.core.urlresolvers import reverse
from .models import *
import time,json,datetime
from PIL import Image
from django.core.mail import send_mail
from django.views.decorators.cache import cache_page,cache_control
from django.views.decorators.vary import vary_on_cookie
from django.utils.translation import activate
from django.utils import translation
from django.conf import settings

# Create your views here.
class IndexView(generic.ListView):
    model = Data
    template_name = 'index.html'
    context_object_name = 'dataList'

@csrf_protect
def upload_image(request):
    if request.method == 'POST':
        callback = request.GET.get('CKEditorFuncNum')
        try:
            path = "media/uploads/" + time.strftime("%Y/%m/",time.localtime())   #还有这里，这里path修改你要上传的路径，我记得我是修改了的，这样就上传到了upload文件夹
            f = request.FILES["upload"]
            file_name = path + f.name
            # des_origin_f = open(file_name, "wb+")
            # for chunk in f:                 #我修改的是这里，因为python后期的版本放弃了chunk函数，直接遍历类文件类型就可以生成迭代器了。
            #     des_origin_f.write(chunk)
            # des_origin_f.close()
            im = Image.open(f)
            im.thumbnail((400,300),Image.ANTIALIAS)
            im.save(file_name, "JPEG")
        except Exception, e:
            print e
        res = r"<script>window.parent.CKEDITOR.tools.callFunction("+callback+",'/"+file_name+"', '');</script>"
        return HttpResponse(res)
    else:
        raise Http404()

    

def custom_proc(request):
    "A context processor that provides 'app', 'user' and 'ip_address'."
    return {
        'app': 'My app',
        'user': request.user,
        'ip_address': request.META['REMOTE_ADDR'],
    }

 
@login_required(login_url="/login/") 
@vary_on_cookie
def profile(request):  
    user_language = 'en'
    # translation.activate(user_language)
    # request.session[translation.LANGUAGE_SESSION_KEY] = user_language
    messages.add_message(request, messages.INFO, u'Hello world.猪')
    messages.error(request, 'Document deleted.')
    messages.info(request, 'Nice to meet u.')
    # send_mail(u'我是标题', u'我是正文.', '745784917@qq.com',
    # ['745784917@qq.com'], fail_silently=False,auth_user='745784917@qq.com',auth_password='msyfls789abc')
    #第一种写法
    xhr = render_to_response('profile.html',
    {'message': request.user.has_perm('auth.change_user')},
    context_instance=RequestContext(request, processors=[custom_proc]))
    # xhr.set_cookie(settings.LANGUAGE_COOKIE_NAME, user_language)
    return xhr

    #第二种写法
    t = loader.get_template('profile.html')
    c = RequestContext(request, {'message': request.user.has_perm('auth.change_user')},
            processors=[custom_proc])
    return t.render(c)


def logout_view(request):
    auth.logout(request)
    # Redirect to a success page.
    return HttpResponseRedirect(reverse('profile'))

def notes(request):
    return render(request,'notes.html')

def toJSON(obj):
    context = []
    fieldset = obj[0]._meta.get_all_field_names()
    for data in obj:
        d = {}
        for attr in fieldset:
            if isinstance(getattr(data, attr),datetime.datetime):
                d[attr] = getattr(data, attr).strftime('%Y-%m-%d %H:%M:%S')
            elif isinstance(getattr(data, attr),datetime.date):
                d[attr] = getattr(data, attr).strftime('%Y-%m-%d')
            elif isinstance(getattr(data, attr),datetime.time):
                d[attr] = getattr(data, attr).strftime('%H:%M:%S')
            else:
                d[attr] = getattr(data, attr)
        context.append(d)
    return json.dumps(context)

def getnotes(request):
    dataList = Notes.objects.all()
    return HttpResponse(toJSON(dataList),content_type="application/json")