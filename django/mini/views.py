from django.shortcuts import render, redirect
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .useful.useful import basicContext
from django.contrib import messages
from django.utils.translation import gettext as _


# home
def home(request, exception=None):
    context = {}
    basicContext(request, context)
    context['title'] = _('home')
    context['main_classes'] = 'space-top'
    response = render(request, 'mini/html.html', context)
    return response

# Login view
def loginPage(request):
    
    context = {}
    basicContext(request, context)
    context['title'] = _('login')
    context['page_title'] = _('login')
    context['main_classes'] = 'space-top'
    context['submit_button'] = _('login')

    if request.user.is_authenticated:
        messages.success(request, _('you are already logged'))
        response = redirect('/')
    else:
     
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
    
            if user is not None:
                login(request,user)
                messages.success(request, _('successfully logged in'))
                response = redirect('/')
                return response
            
            else:
                messages.warning(request, _('login failed'))
        
        form = AuthenticationForm()
        context['form'] = form
        response = render(request, 'mini/form_page.html', context)
        
    return response

# User profile view
def userProfilePage(request):
    
    context = {}
    basicContext(request, context)
    
    context['title'] = _('user profile')
    context['page_title'] = _('user profile')
    context['submit_button'] = _('save')
    context['main_classes'] = 'space-top'

    user = User.objects.get(pk=request.user.id)
    context['user']=user

    return render(request, 'mini/form_page.html', context)

# Logout view
def logoutPage(request):
    logout(request)
    messages.success(request, _('successfully logged out'))
    return redirect('/')

def fourOuFour(request, exception=None):
    response = render(request, 'mini/404.html')
    return response

def fourOuThree(request, exception=None):
    response = render(request, 'mini/403.html')
    return response