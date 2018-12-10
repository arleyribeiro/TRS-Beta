from rest_framework import serializers
from .models import Inconsistency, Suggestion

class SuggestionSerializer(serializers.ModelSerializer):

	#id=serializers.ReadOnlyField(source='suggestion.id',read_only=True) #apenas leitura
	class Meta:
		model = Suggestion
		fields = ('id',	'tip') #https://stackoverflow.com/questions/35676293/django-rest-framework-tuple-being-interpreted-as-a-string?rq=1

class InconsistencySerializer(serializers.ModelSerializer):
	
	suggestions = SuggestionSerializer(many=True)
	username=serializers.ReadOnlyField(source='user.username',read_only=True) #apenas leitura
	role=serializers.ReadOnlyField(source='user.role',read_only=True) #apenas leitura

	class Meta:
		model = Inconsistency
		fields = ('user','username' ,'id','isRegex', 'regexType', 'name', 'pattern', 'description', 'created', 'type', 'suggestions', 'role')
		read_only_fields= ('role',) 

	def create(self, validated_data):
		suggestions_data = validated_data.pop('suggestions')
		print(suggestions_data)
		inconsistency = Inconsistency.objects.create(**validated_data)
		for suggestion in suggestions_data:
			Suggestion.objects.create(inconsistency=inconsistency, **suggestion)
		return inconsistency

	def update(self, instance, validated_data):		
		instance.name = validated_data.get('name', instance.name)
		instance.pattern = validated_data.get('pattern', instance.pattern)
		instance.type = validated_data.get('type', instance.type)
		instance.isRegex = validated_data.get('isRegex', instance.isRegex)
		instance.regexType = validated_data.get('regexType', instance.regexType)
		instance.description = validated_data.get('description', instance.description)
		suggestions_data = validated_data.pop('suggestions')
		
		Suggestion.objects.filter(inconsistency=instance).delete()#remove all suggestions
		for suggestion in suggestions_data:
			Suggestion.objects.create(inconsistency=instance, **suggestion)
		instance.save()
		return instance