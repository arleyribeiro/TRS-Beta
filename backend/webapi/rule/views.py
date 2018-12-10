from rest_framework import viewsets
from .models import Inconsistency, Suggestion
from .serializers import InconsistencySerializer, SuggestionSerializer

class InconsistencyViewSet(viewsets.ModelViewSet):
	serializer_class = InconsistencySerializer
	#queryset = Inconsistency.objects.all()

	def get_queryset(self):
		
		#Inconsistency.objects.filter(Q(user=1) or Q(type=1)).values()
		return Inconsistency.objects.all()

class SuggestionViewSet(viewsets.ModelViewSet):
	serializer_class = SuggestionSerializer
	queryset = Suggestion.objects.all()

