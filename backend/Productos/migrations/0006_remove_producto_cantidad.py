# Generated by Django 5.2 on 2025-04-24 19:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0005_merge_20250422_2051'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='cantidad',
        ),
    ]
