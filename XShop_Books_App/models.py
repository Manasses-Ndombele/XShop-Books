from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from PIL import Image

def check_image_format(value):
    img = Image.open(value)
    _format = img.format.lower()
    if _format not in ['jpg', 'jpeg']:
        raise ValidationError('O Formato da Imagem tem de ser JPG ou JPEG.')

    if img.width != 400 or img.height != 500:
        raise ValidationError('A imagem tem de ter 400px de largura e 500px de altura')

class Books(models.Model):
    id = models.AutoField(primary_key=True)
    cover_image = models.ImageField(verbose_name='Book Cover', upload_to='books-covers/', validators=[check_image_format])
    title = models.CharField(verbose_name='Title', max_length=70)
    subtitle = models.CharField(verbose_name='Subtitle', max_length=100, blank=True, null=True, default='Unknown')
    price = models.DecimalField(verbose_name='Price', max_digits=5, decimal_places=2)
    in_stock = models.IntegerField(verbose_name='In Stock')
    author = models.CharField(verbose_name='Autor', max_length=70)
    coauthor = models.CharField(verbose_name='Co-Autor', max_length=70, blank=True, null=True, default='Unknown')
    editor = models.CharField(verbose_name='Editor', max_length=100, blank=True, null=True, default='Unknown')
    edition = models.IntegerField(verbose_name='Edition', blank=True, null=True, default=1)
    release_date = models.DateField(verbose_name='Release Date', blank=True, null=True)
    description = models.TextField(verbose_name='Description')

    def __str__(self):
        return self.title.title()

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

class Coupons(models.Model):
    id = models.AutoField(primary_key=True)
    discount = models.IntegerField(verbose_name='Discount')
    name = models.CharField(max_length=100, verbose_name='Name')
    expiration_date = models.DateField(verbose_name='Data de expiração')

    def __str__(self):
        return self.name.title()

    class Meta:
        verbose_name = 'Coupon'
        verbose_name_plural = 'Coupons'

class ShoppingCart(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(to=Books, on_delete=models.CASCADE, verbose_name='Product')
    client = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='Client')
    quantity = models.IntegerField(verbose_name='Quantity')
    buyed = models.BooleanField(verbose_name='buyed', default=False)

    def __str__(self):
        return self.client.username

    class Meta:
        verbose_name = 'Shopping Cart'
        verbose_name_plural = 'Shopping Carts'

class Sales(models.Model):
    id = models.AutoField(primary_key=True)
    buyer = models.ForeignKey(verbose_name='Buyer', to=User, on_delete=models.SET_NULL, null=True, blank=True)
    products = models.ManyToManyField(ShoppingCart, related_name='Products')
    date = models.DateTimeField(verbose_name='Sale Date', auto_now_add=True)
    coupon = models.ForeignKey(verbose_name='Coupon', to=Coupons, on_delete=models.SET_NULL, null=True, blank=True)
    total = models.DecimalField(verbose_name='Total', decimal_places=2, max_digits=6)

    def __str__(self):
        return f'{self.date} - {self.total} US$'

    class Meta:
        verbose_name = 'Sale'
        verbose_name_plural = 'Sales'

class Saved(models.Model):
    id = models.AutoField(primary_key=True)
    category_choices = [
        ('favorite', 'Favorite'),
        ('saved', 'Saved')
    ]

    category = models.CharField(choices=category_choices, max_length=8, verbose_name='Category')
    product = models.ForeignKey(to=Books, on_delete=models.CASCADE, verbose_name='Book')
    client = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='User')

    def __str__(self):
        return self.category

    class Meta:
        verbose_name = 'Saved or Favorite'
        verbose_name_plural = 'Saved & Favorites'
