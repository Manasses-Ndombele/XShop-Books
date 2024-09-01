# Generated by Django 5.0.7 on 2024-08-01 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('XShop_Books_App', '0015_alter_shoppingcart_client'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='edition',
            field=models.IntegerField(blank=True, default='Unknown', null=True, verbose_name='Edition'),
        ),
        migrations.AlterField(
            model_name='books',
            name='editor',
            field=models.CharField(blank=True, default='Unknown', max_length=100, null=True, verbose_name='Editor'),
        ),
        migrations.AlterField(
            model_name='books',
            name='subtitle',
            field=models.CharField(blank=True, default='Unknown', max_length=100, null=True, verbose_name='Subtitle'),
        ),
    ]
