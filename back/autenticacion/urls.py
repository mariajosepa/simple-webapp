from django.urls import path
from .views import *

urlpatterns = [
    path("enviar_token/", SendOTPView.as_view(), name='enviar-otp-list'),
]