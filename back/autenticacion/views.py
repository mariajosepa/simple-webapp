from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random
from django.core.mail import send_mail
import requests
from datetime import datetime
from django.conf import settings

class SendOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        
        user = requests.get(f'http://localhost:8000/api/usuarios/{email}')
        user = user.json()
        if 'error' in user:
            return Response(user, status=status.HTTP_404_NOT_FOUND)
        
        # Token aleatorio.
        otp_token = random.randint(100000, 999999)
        
        send_mail(
            'Código de verificación JaveApp',
            f'Hola {user['nombre']},\nHas intentado acceder a Jave App el {datetime.now()}. Tu código de verificación es: {otp_token}.\nSi no has sido tú el que hizo el inicio de sesión, por favor hacer caso omiso a este mensaje y notificar la situación.',
            settings.EMAIL_HOST_USER,
            [user['correo']],
            fail_silently=False,
        )

        return Response({"correo": user['correo'], "otp": otp_token}, status=status.HTTP_200_OK)
