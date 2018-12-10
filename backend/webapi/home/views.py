from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView

# Create your views here.
def index(request):
	return render(request,'index.html',{})
