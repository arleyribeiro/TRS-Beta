"""webapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
#from webapi.core.views import ProfileViewSet, profile
from webapi.user.views import UserViewSet, RegistrationUserViewSet
from webapi.rule.views import InconsistencyViewSet, SuggestionViewSet
from webapi.historyChangesText.views import HistoryChangesTextViewSet, ChangeInTextViewSet, SharedTextsViewSet, FoundInconsistenciesViewSet
from webapi.simpleProcessor import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from webapi.home.views import index

SharedTextsViewSet.as_view({'get': 'getNotifications'})
SharedTextsViewSet.as_view({'get': 'textSharedWithMe'})
SharedTextsViewSet.as_view({'get': 'sharedWithMe'})
SharedTextsViewSet.as_view({'post': 'deleteSharedTexts'})


router = routers.DefaultRouter()
#router.register('profile',ProfileViewSet, base_name='profile')

router.register('user', UserViewSet, base_name='user')
router.register('inconsistency', InconsistencyViewSet, base_name='inconsistency')
router.register('suggestion', SuggestionViewSet, base_name='suggestion')
router.register('historyChangesText', HistoryChangesTextViewSet, base_name='historyChangesText')
router.register('changeInText', ChangeInTextViewSet, base_name='changeInText')
router.register('sharedTexts', SharedTextsViewSet, base_name='sharedTexts')
router.register('foundInconsistencies', FoundInconsistenciesViewSet, base_name='foundInconsistencies')
router.register('registrationUser', RegistrationUserViewSet, base_name='registrationUser')

urlpatterns = [
#    path('admin/', admin.site.urls),
#    path('api-auth/', include('rest_framework.urls')),
    path('simpleProcessor/',views.simpleProcessor, name='simpleProcessor'),
    path('sendEmail/',views.sendEmail, name='sendEmail'),
#    path('simpleProcessorPdf/',views.simpleProcessorPDF, name='simpleProcessorPDF'),
#    path('index/', index, name='index'),
    path('',include(router.urls)),
    path('api-token-auth/', obtain_jwt_token),
    path('refresh-token/', refresh_jwt_token),
    path('admin/', index),
]
