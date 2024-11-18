from django.db import models

# Create your models here.
class Rol(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    class Meta:
        managed = False # Django no manejará las migraciones de la tabla.
        db_table = 'roles' # La tabla de roles en la base de datos.

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    correo = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    contrasena = models.CharField(max_length=255)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name='rol_name')
    class Meta:
        managed = False # Django no manejará las migraciones de la tabla.
        db_table = 'usuarios' # La tabla de usuarios en la base de datos.
