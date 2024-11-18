from django.urls import path
from . import views

urlpatterns = [
    path("dispositivos/", views.index, name='index'),
]