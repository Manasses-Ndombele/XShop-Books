# Generated by Django 5.0.7 on 2024-07-16 14:57

import XShop_Books_App.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Books',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cover_image', models.ImageField(upload_to='books-covers/', validators=[XShop_Books_App.models.check_image_format], verbose_name='Book Cover')),
                ('title', models.CharField(max_length=70, verbose_name='Title')),
                ('subtitle', models.CharField(max_length=100, verbose_name='Subtitle')),
                ('price', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Price')),
                ('in_stock', models.IntegerField(verbose_name='In Stock')),
                ('author', models.CharField(max_length=70, verbose_name='Autor')),
                ('release_date', models.DateField(verbose_name='Release Date')),
                ('description', models.TextField(verbose_name='Description')),
            ],
            options={
                'verbose_name': 'Book',
                'verbose_name_plural': 'Books',
            },
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('holders_name', models.CharField(max_length=70, verbose_name="Holder's Name")),
                ('expiration_month', models.SmallIntegerField(verbose_name='Expiration Month')),
                ('expiration_year', models.IntegerField(verbose_name='Expiration Year')),
                ('category', models.CharField(choices=[('credit', 'Credit'), ('debit', 'Debit')], max_length=6, verbose_name='Type')),
                ('number', models.BigIntegerField(verbose_name='Card Number')),
                ('security_code', models.IntegerField(verbose_name='Security Code')),
            ],
            options={
                'verbose_name': 'Card',
                'verbose_name_plural': 'Cards',
            },
        ),
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('discount', models.IntegerField(verbose_name='Discount')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
            ],
            options={
                'verbose_name': 'Coupon',
                'verbose_name_plural': 'Coupons',
            },
        ),
        migrations.CreateModel(
            name='Sales',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Sale Date')),
                ('buyer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Buyer')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='XShop_Books_App.books', verbose_name='Product')),
            ],
            options={
                'verbose_name': 'Sale',
                'verbose_name_plural': 'Sales',
            },
        ),
    ]
