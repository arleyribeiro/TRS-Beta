from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db.models import Q
from .models import HistoryChangesText, ChangeInText, SharedTexts, FoundInconsistencies
from .serializers import HistoryChangesTextSerializer, ChangeInTextSerializer, SharedTextsSerializer, FoundInconsistenciesSerializer

class HistoryChangesTextViewSet(viewsets.ModelViewSet):
	queryset = HistoryChangesText.objects.all()
	serializer_class = HistoryChangesTextSerializer

class ChangeInTextViewSet(viewsets.ModelViewSet):
	queryset = ChangeInText.objects.all()
	serializer_class = ChangeInTextSerializer

class SharedTextsViewSet(viewsets.ModelViewSet):
	queryset = SharedTexts.objects.all()
	serializer_class = SharedTextsSerializer

	@action(detail=True)
	def getNotifications(self, request, pk=None):
		print("TEste", pk)
		notifications = []
		for q in SharedTexts.objects.filter(Q(sharedUser=pk) & Q(visited=False)):
			print(q)
			notifications.append({ 
				'id': q.getId(),
				'idText': q.getHistoryChangesTextId(), 
				'textName': q.getTextName(), 
				'onwerName': q.getOnwerUserName(), 
				'sharedName': q.getSharedUserName(), 
				'created': q.getCreated(),
					'dataId': {
						'onwerUser': q.getOnwerUserId(),
	    				'sharedUser': q.getSharedUserId(),
	    				'historyChangesText': q.getHistoryChangesTextId(),
	    				'visited': q.getVisited()
	    			}
				})

		return JsonResponse(notifications, safe=False)

	@action(detail=True)
	def textSharedWithMe(self, request, pk=None):
		listTextId = []
		listText = []
		for q in SharedTexts.objects.filter(sharedUser=pk).values():
			listTextId.append(q['historyChangesText_id'])

		listTextId = set(listTextId)

		for text in HistoryChangesText.objects.filter(id__in=listTextId).values():
			listText.append(text)
		return JsonResponse(listText, safe=False)

	@action(detail=True)
	def sharedWithMe(self, request, pk=None):
		listText = []
		for q in SharedTexts.objects.filter(sharedUser=pk):
			print(q)
			listText.append({ 
				'id': q.getId(),
				'idText': q.getHistoryChangesTextId(), 
				'textName': q.getTextName(), 
				'onwerName': q.getOnwerUserName(), 
				'sharedName': q.getSharedUserName(), 
				'created': q.getCreated(),
					'dataId': {
						'onwerUser': q.getOnwerUserId(),
	    				'sharedUser': q.getSharedUserId(),
	    				'historyChangesText': q.getHistoryChangesTextId(),
	    				'visited': q.getVisited()
	    			}
			})
		return JsonResponse(listText, safe=False)

	@action(detail=True)
	def deleteSharedTexts(self, request, pk=None):
		print(request['idTexts'])
		idText = request['idTexts']
		for id in idText:
			SharedTexts.objects.filter(id=id).delete()
		return JsonResponse('ok', safe=False)

class FoundInconsistenciesViewSet(viewsets.ModelViewSet):
	queryset = FoundInconsistencies.objects.all()
	serializer_class = FoundInconsistenciesSerializer