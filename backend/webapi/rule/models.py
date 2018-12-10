from django.db import models
#from webapi.user.models import User
# Create your models here.
from django.conf import settings

	
class Inconsistency(models.Model):

	user=models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user', on_delete=models.CASCADE,blank=True, null=True)
	name = models.CharField(max_length=50, blank=False)
	pattern = models.CharField(max_length=100, blank=False, null=False)
	description = models.CharField(max_length=500, blank=False, null=False)
	created = models.DateTimeField(auto_now_add=True)
	isRegex = models.BooleanField(default=False)
	#1 - regex puro
	#2 - regex para texto
	#3 - texto

	type_choice = (
		(1, 'Public'),
		(2, 'Private')
	)

	regex_choice = (
		(1, 'regex'),
		(2, 'regexBoundary'),
		(3, 'regexText')
	)
	
	regexType = models.IntegerField(choices=regex_choice, default=3)
	type = models.IntegerField(choices=type_choice, default=1)

	def __unicode__(self):
		return self.inconsistency.name

class Suggestion(models.Model):
	inconsistency = models.ForeignKey(Inconsistency, related_name='suggestions', on_delete=models.CASCADE)
	tip = models.CharField(max_length=100, null=False)
 
	def __unicode__(self):
		return self.inconsistency.name


