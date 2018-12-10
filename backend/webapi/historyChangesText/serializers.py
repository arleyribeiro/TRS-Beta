from rest_framework import serializers
from .models import HistoryChangesText, ChangeInText, SharedTexts, FoundInconsistencies

class ChangeInTextSerializer(serializers.ModelSerializer):
	class Meta:
		model = ChangeInText
		fields = ('newText','oldText','suggestion', 'disabled')
		read_only_fields= ('disabled',) 

class SharedTextsSerializer(serializers.ModelSerializer):
	class Meta:
		model = SharedTexts
		fields = ('onwerUser','sharedUser','historyChangesText','visited',)

	def create(self, validated_data):
		print(validated_data)
		sharedTexts = SharedTexts.objects.create(**validated_data)
		return sharedTexts

class FoundInconsistenciesSerializer(serializers.ModelSerializer):
	changesInText = ChangeInTextSerializer(many=True)
	class Meta:
		model = FoundInconsistencies
		fields = ('changesInText', 'foundInconsistenciesNumber', 'appliedSuggestionsNumber', 'revisionNumber', 'foundRulesNumber')
		read_only_fields = ('revisionNumber',)

class HistoryChangesTextSerializer(serializers.ModelSerializer):
	foundInconsistencies = FoundInconsistenciesSerializer(many=True)
	username=serializers.ReadOnlyField(source='user.username',read_only=True) #apenas leitura

	class Meta:
		model = HistoryChangesText
		fields = ('user','username' ,'id', 'name', 'description', 'created', 'text', 'foundInconsistencies')

	def create(self, validated_data):
		foundInconsistencies_data = validated_data.pop('foundInconsistencies')
		changesInText_data = foundInconsistencies_data[0]['changesInText']
		del foundInconsistencies_data[0]['changesInText']
		historyChangesText = HistoryChangesText.objects.create(**validated_data)	
		foundInconsistencies = FoundInconsistencies.objects.create(historyChangesText=historyChangesText, **foundInconsistencies_data[0])

		for changeInText in changesInText_data:
			ChangeInText.objects.create(foundInconsistencies=foundInconsistencies, **changeInText)
		
		return historyChangesText

	def update(self, instance, validated_data):
		print("instance: ", instance)
		foundInconsistencies_data = validated_data.pop('foundInconsistencies')
		changesInText_data = foundInconsistencies_data[0]['changesInText']
		del foundInconsistencies_data[0]['changesInText']
		print("validated_data: ", validated_data)

		instance.description = validated_data.get('description', instance.description)
		instance.text = validated_data.get('text', instance.text)
		instance.name = validated_data.get('name', instance.name)

		instance.save()

		revisionNumber = FoundInconsistencies.objects.filter(historyChangesText=instance).values().latest('revisionNumber')['revisionNumber']
		foundInconsistencies_data[0]['revisionNumber'] = revisionNumber + 1
		
		foundInconsistencies = FoundInconsistencies.objects.create(historyChangesText=instance, **foundInconsistencies_data[0])

		for changeInText in changesInText_data:
			ChangeInText.objects.create(foundInconsistencies=foundInconsistencies, **changeInText)

		return instance