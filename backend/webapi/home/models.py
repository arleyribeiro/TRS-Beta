# from django.db import models
# from django.contrib.auth.models import AbstractUser
 
# class User(AbstractUser):
# 	student = 1
# 	teacher = 2
# 	role_choices = (
# 		(student, 'student'),
# 		(teacher, 'teacher'),
# 	)
# 	role = models.PositiveSmallIntegerField(choices=role_choices, null=True, blank=True)

# class Inconsistency(models.Model):
# 	name = models.CharField(max_length=50, blank=False)
# 	pattern = models.CharField(max_length=50, blank=False, null=False)
# 	description = models.CharField(max_length=50, blank=False, null=False)
# 	created = models.DateTimeField(auto_now_add=True)
# 	#user
# 	type_choice = (
# 		('1', 'Public'),
# 		('2', 'Private')
# 	)
	
# 	type = models.CharField(max_length=2, choices=type_choice, default='1')

# class Suggestion(models.Model):
# 	inconsistency = models.ForeignKey(Inconsistency, related_name='suggestions', on_delete=models.CASCADE)
# 	tip = models.CharField(max_length=100, null=False)
 
# 	def __unicode__(self):
# 		return self.inconsistency.name



