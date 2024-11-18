from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

# Create your views here.
class FabricanteListView(APIView):
    def get(self, request):
        fabricantes = Fabricante.objects.using('dispositivos').all()
        serializer = FabricanteSerializer(fabricantes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = FabricanteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class EstadoListView(APIView):
    def get(self, request):
        estados = Estado.objects.using('dispositivos').all()
        serializer = EstadoSerializer(estados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = EstadoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class EstadoDispositivoListView(APIView):
    def get(self, request):
        estadodispositivos = EstadoDispositivo.objects.using('dispositivos').all()
        serializer = EstadoDispositivoSerializer(estadodispositivos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = EstadoDispositivoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class TipoListView(APIView):
    def get(self, request):
        tipos = Tipo.objects.using('dispositivos').all()
        serializer = TipoSerializer(tipos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = TipoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class DispositivoListView(APIView):
    def get(self, request):
        dispositivos = Dispositivo.objects.select_related('fabricante', 'estado', 'estadodispositivo', 'tipo').using('dispositivos').all()
        serializer = DispositivoSerializer(dispositivos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = DispositivoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)