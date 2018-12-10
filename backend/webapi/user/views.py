from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer, RegistrationUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	queryset = User.objects.all()

class RegistrationUserViewSet(viewsets.ModelViewSet):
	#queryset = User.objects.all()
	permission_classes = (AllowAny,)
	serializer_class = RegistrationUserSerializer

	def get_queryset(self):
		return None

	def post(self, request):
		user = request.data.get('user', {})
		serializer = self.serializer_class(data=user)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
