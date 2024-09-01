# Generated by Django 5.0.7 on 2024-07-31 09:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('XShop_Books_App', '0012_remove_shoppingcart_cart'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='shoppingcart',
            name='buyed',
            field=models.BooleanField(default=False, verbose_name='buyed'),
        ),
        migrations.AlterField(
            model_name='shoppingcart',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, unique=True, verbose_name='Client'),
        ),
    ]
