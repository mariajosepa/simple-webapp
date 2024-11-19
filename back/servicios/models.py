from django.contrib.gis.db import models

# Create your models here.
class Cliente(models.Model):
    id = models.AutoField(primary_key=True)
    cc = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    correo = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'clientes'

class Estado(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'estados'

class Servicio(models.Model):
    id = models.AutoField(primary_key=True)
    fecha_inicio = models.DateTimeField()
    fecha_final = models.DateTimeField()
    duracion = models.DurationField()
    dispositivos = models.JSONField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='cliente_name')
    productos = models.CharField(max_length=255)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE, related_name='estado_name')
    descripcion = models.CharField(max_length=255)
    destino = models.PointField() # Sirve para Latitud y Longitud.
    class Meta:
        managed = False
        db_table = 'servicios'