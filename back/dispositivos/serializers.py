from rest_framework import serializers
from .models import *

class FabricanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fabricante
        fields = '__all__'

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'

class EstadoDispositivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoDispositivo
        fields = '__all__'

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'

class DispositivoSerializer(serializers.ModelSerializer):
    fabricante = FabricanteSerializer(read_only=True)
    estado = EstadoSerializer(read_only=True)
    estadodispositivo = EstadoDispositivoSerializer(read_only=True)
    tipo = TipoSerializer(read_only=True)
    class Meta:
        model = Dispositivo
        fields = ['id', 'nombre', 'tipo', 'fabricante', 'estado', 'estadodispositivo', 'bateria', 'temperatura', 'mantenimientos']