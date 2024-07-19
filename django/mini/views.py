from django.shortcuts import render
from .useful.useful import basicContext


def home(request, exception=None):
    context = {}
    context['title'] = 'home'
    basicContext(request, context)
    response = render(request, 'mini/html.html', context)
    return response


def fourOuFour(request, exception=None):
    response = render(request, 'mini/404.html')
    return response

def fourOuThree(request, exception=None):
    response = render(request, 'mini/403.html')
    return response