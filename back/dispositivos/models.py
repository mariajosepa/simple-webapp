from django.db import models

# Create your models here.
class Fabricante(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'fabricantes'

class Estado(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'estados'

class EstadoDispositivo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'estadodispositivos'

class Tipo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'tipos'

class Dispositivo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE, related_name='tipo_name')
    fabricante = models.ForeignKey(Fabricante, on_delete=models.CASCADE, related_name='fabricante_name')
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE, related_name='estado_name')
    estadodispositivo = models.ForeignKey(EstadoDispositivo, on_delete=models.CASCADE, related_name='estadodispositivo_name')
    bateria = models.FloatField()
    temperatura = models.FloatField()
    mantenimientos = models.JSONField()
    class Meta:
        managed = False
        db_table = 'dispositivos'
