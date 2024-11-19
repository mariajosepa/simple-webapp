from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import *

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'

class ServicioSerializer(GeoFeatureModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    estado = EstadoSerializer(read_only=True)
    class Meta:
        model = Servicio
        geo_field = "destino"
        fields = ['id', 'fecha_inicio', 'fecha_final', 'duracion', 'dispositivos', 'cliente', 'productos', 'estado', 'descripcion', 'destino']