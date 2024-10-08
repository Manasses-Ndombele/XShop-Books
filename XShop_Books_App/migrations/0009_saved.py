# Generated by Django 5.0.2 on 2024-07-26 08:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('XShop_Books_App', '0008_coupons_expiration_date'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Saved',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.CharField(choices=[('favorite', 'Favorite'), ('saved', 'Saved')], max_length=8, verbose_name='Category')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='XShop_Books_App.books', verbose_name='Book')),
            ],
            options={
                'verbose_name': 'Saved or Favorite',
                'verbose_name_plural': 'Saved & Favorites',
            },
        ),
    ]
