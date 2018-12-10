from django.db import models
from django.conf import settings
from webapi.rule.models import Suggestion

# Create your models here.
class HistoryChangesText(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='userText', on_delete=models.CASCADE,blank=True, null=True)
	created = models.DateTimeField(auto_now_add=True)
	text = models.CharField(max_length=100000, blank=False, null=False)
	name = models.CharField(max_length=100, blank=False, null=False)
	description = models.CharField(max_length=500, blank=False, null=False)

	def __unicode__(self):
		return self.name

class FoundInconsistencies(models.Model):
	historyChangesText = models.ForeignKey(HistoryChangesText, related_name='foundInconsistencies', on_delete=models.CASCADE)
	foundInconsistenciesNumber = models.IntegerField(default=0)
	appliedSuggestionsNumber = models.IntegerField(default=0)
	revisionNumber = models.IntegerField(default=1)
	foundRulesNumber = models.IntegerField(default=0)
	#created = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.historyChangesText.name

class ChangeInText(models.Model):
	foundInconsistencies = models.ForeignKey(FoundInconsistencies, related_name='changesInText', on_delete=models.CASCADE)
	#historyChangesText = models.ForeignKey(HistoryChangesText, related_name='historyText', on_delete=models.CASCADE)
	suggestion = models.ForeignKey(Suggestion, related_name='historySuggestion', on_delete=models.CASCADE)
	oldText = models.CharField(max_length=1000, blank=False, null=False)
	newText = models.CharField(max_length=1000, blank=False, null=False)
	disabled = models.BooleanField(default=True)

	def __unicode__(self):
		return self.historyChangesText.name

class SharedTexts(models.Model):
	onwerUser = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='onwerUser', on_delete=models.CASCADE)
	sharedUser = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sharedUser', on_delete=models.CASCADE)
	historyChangesText = models.ForeignKey(HistoryChangesText, related_name='historyChangesText', on_delete=models.CASCADE)
	created = models.DateTimeField(auto_now_add=True)
	visited = models.BooleanField(default=False)

	def __unicode__(self):
		return self.onwerUser.name

	def getSharedUserName(self):		
		return self.sharedUser.first_name + ' ' + self.sharedUser.last_name

	def getSharedUserId(self):		
		return self.sharedUser.id

	def getOnwerUserName(self):		
		return self.onwerUser.first_name + ' ' + self.onwerUser.last_name

	def getOnwerUserId(self):		
		return self.onwerUser.id
	
	def getTextName(self):		
		return self.historyChangesText.name

	def getCreated(self):		
		return self.created

	def getHistoryChangesTextId(self):
		return self.historyChangesText.id

	def getId(self):				
		return self.id

	def getVisited(self):				
		return self.visited