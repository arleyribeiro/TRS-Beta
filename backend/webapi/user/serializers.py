from rest_framework import serializers
from webapi.rule.serializers import InconsistencySerializer
 
from .models import User
  
class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('url', 'id', 'username', 'password', 'first_name', 'last_name', 'email', 'role')

	def update(self, instance, validated_data):		
		instance.first_name = validated_data.get('first_name', instance.first_name)
		instance.last_name = validated_data.get('last_name', instance.last_name)
		instance.password = validated_data.get('password', instance.password)
		instance.role = validated_data.get('role', instance.role)
		instance.set_password(instance.password)		
		instance.save()
		return instance


class RegistrationUserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('password', 'first_name', 'last_name', 'email', 'role', 'username')


	def create(self, validated_data):		
		user = User.objects.create(**validated_data)
		user.set_password(validated_data['password'])
		#user.username = user.email.split('@')[0]
		user.save()			
		return user