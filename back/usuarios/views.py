from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario,Rol
from .serializers import UsuarioSerializer,RolSerializer

# Create your views here.
class UsuarioListView(APIView):
    def get(self, request, mail=None):
        if mail:
            try:
                usuarios = Usuario.objects.select_related('rol').get(correo=mail) # Devuelve el usuario con un correo electronico definido.
                serializer = UsuarioSerializer(usuarios)
                return Response(serializer.data)
            except Usuario.DoesNotExist:
                return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            usuarios = Usuario.objects.select_related('rol').all() # Devuelve todos los usuarios.
            serializer = UsuarioSerializer(usuarios, many=True)
            return Response(serializer.data)