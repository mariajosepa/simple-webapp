from django.urls import path
from .views import UsuarioListView, RolListView

urlpatterns = [
    path('', UsuarioListView.as_view(), name='usuarios-list'),
    path('roles/',RolListView.as_view(), name='roles-list'),
    path('<str:mail>', UsuarioListView.as_view(), name='usuarios-list'),
]