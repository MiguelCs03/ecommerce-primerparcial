# Generated by Django 5.2 on 2025-04-21 19:23

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0002_rename_cantidad_mininma_inventario_cantidad_minima'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
    ]
