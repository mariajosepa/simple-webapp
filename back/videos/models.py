from django.db import models

# Create your models here.
class Video(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateTimeField()
    dispositivo = models.IntegerField()
    url = models.CharField(max_length=255)
    class Meta:
        managed = False # Django no manejará las migraciones de la tabla.
        db_table = 'videos' # La tabla de usuarios en la base de datos.