from django.db import models
from django.contrib.auth.models import AbstractUser
from webapi.rule.models import Inconsistency
 
class User(AbstractUser):
	inconsistencies = models.ForeignKey(Inconsistency, related_name='inconsistencies', on_delete=models.CASCADE, blank=True, null=True)
	student = 1
	teacher = 2
	role_choices = (
		(student, 'student'),
		(teacher, 'teacher'),
	)
	email = models.EmailField(max_length=255, unique=True,)
	role = models.PositiveSmallIntegerField(choices=role_choices, null=True, blank=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	def getName(self):
		return self.first_name + ' ' + self.last_name

	def getEmail(self):
		return self.email

