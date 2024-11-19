from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
import requests

# Create your views here.
class ClienteListView(APIView):
    def get(self, request, cc=None):
        if cc:
            try:
                clientes = Cliente.objects.using('servicios').get(cc=cc)
                serializer = ClienteSerializer(clientes)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Cliente.DoesNotExist:
                return Response({"error": "Cliente no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            clientes = Cliente.objects.using('servicios').all()
            serializer = ClienteSerializer(clientes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class EstadoListView(APIView):
    def get(self, request):
        estados = Estado.objects.using('servicios').all()
        serializer = EstadoSerializer(estados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = EstadoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class ServicioListView(APIView):
    def get(self, request):
        servicios = Servicio.objects.select_related('cliente', 'estado').using('servicios').all()
        dispo_data = requests.get('http://localhost:8000/api/dispositivos')
        dispo_data = dispo_data.json()
        dispo_dict = {dispositivo['id']: dispositivo for dispositivo in dispo_data} # Se ajusta el request a un diccionario para encontrar más fácil los dispositivos.
        data = []
        for servicio in servicios:
            dispositivos = []
            for id_dispo in servicio.dispositivos:
                dispositivos.append(dispo_dict[id_dispo])
            data.append({
                "id": servicio.id,
                "fecha_inicio": servicio.fecha_inicio,
                "fecha_final": servicio.fecha_final,
                "duracion": servicio.duracion,
                "dispositivos": dispositivos,
                "cliente": {
                    "id": servicio.cliente.id,
                    "cc": servicio.cliente.cc,
                    "nombre": servicio.cliente.nombre
                },
                "productos": servicio.productos,
                "estado": {
                    "id": servicio.estado.id,
                    "nombre": servicio.estado.nombre
                },
                "descripcion": servicio.descripcion,
                "destino": {
                    "longitud": servicio.destino.x,
                    "latitud": servicio.destino.y
                }
            })

        return Response(data, status=status.HTTP_200_OK)