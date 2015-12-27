# -*- coding:utf-8 -*-
from django.shortcuts import render,render_to_response
from django.http import HttpResponse,Http404,HttpResponseRedirect
from django.views import generic
from django.contrib.auth.decorators import login_required  
from django.contrib import auth 
from django.template import loader, RequestContext 
from django.views.decorators.csrf import csrf_protect
from django.core.urlresolvers import reverse
from .models import Data
import time

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
            des_origin_f = open(file_name, "wb+")
            for chunk in f:                 #我修改的是这里，因为python后期的版本放弃了chunk函数，直接遍历类文件类型就可以生成迭代器了。
                des_origin_f.write(chunk)
            des_origin_f.close()
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
def profile(request):  

    #第一种写法
    return render_to_response('profile.html',
    {'message': request.user.has_perm('auth.change_user')},
    context_instance=RequestContext(request, processors=[custom_proc]))

    #第二种写法
    t = loader.get_template('profile.html')
    c = RequestContext(request, {'message': request.user.has_perm('auth.change_user')},
            processors=[custom_proc])
    return t.render(c)


def logout_view(request):
    auth.logout(request)
    # Redirect to a success page.
    return HttpResponseRedirect(reverse('profile'))