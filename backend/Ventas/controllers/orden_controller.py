# Ventas/controllers/orden_controller.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from Ventas.models import Orden, OrdenItem
from Ventas.serializers import OrdenSerializer, OrdenItemSerializer
from django.db import transaction

class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer

