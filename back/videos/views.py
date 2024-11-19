from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Video
from .serializers import VideoSerializer
import requests
# Create your views here.
class VideoListView(APIView):
    def get(self, request):
        videos = Video.objects.using('videos').all()
        dispo_data = requests.get('http://localhost:8000/api/dispositivos/')
        dispo_data = dispo_data.json()
        dispo_dict = {dispositivo['id']: dispositivo for dispositivo in dispo_data} # Se ajusta el request a un diccionario para encontrar más fácil los dispositivos.
        data = []
        for video in videos:
            dispositivo = dispo_dict[video.dispositivo]
            data.append({
                "id": video.id,
                "fecha": video.fecha,
                "dispositivo": dispositivo,
                "url": video.url
            })
        return Response(data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)