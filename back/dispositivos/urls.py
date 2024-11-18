from django.urls import path
from .views import *

urlpatterns = [
    path("", DispositivoListView.as_view(), name='dispositivo-list'),
    path("fabricantes/", FabricanteListView.as_view(), name='fabricante-list'),
    path("estados/", EstadoListView.as_view(), name='estado-list'),
    path("estadodispositivos/", EstadoDispositivoListView.as_view(), name='estado-dispositivo-list'),
    path("tipos/", TipoListView.as_view(), name='tipo-list'),
]