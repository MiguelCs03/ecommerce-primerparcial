# Generated by Django 5.2 on 2025-04-30 12:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0006_remove_producto_cantidad'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='proveedor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Productos.proveedor'),
        ),
    ]
