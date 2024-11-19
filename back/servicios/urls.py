from django.urls import path
from .views import *

urlpatterns = [
    path("", ServicioListView.as_view(), name='servicio-list'),
    path("clientes/", ClienteListView.as_view(), name='cliente-list'),
    path("clientes/<str:cc>", ClienteListView.as_view(), name='cliente-list'),
    path("estados/", EstadoListView.as_view(), name='estado-list'),
]