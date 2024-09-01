from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from XShop_Books_App.views import home, load_books, sale, search_books, add_saved, remove_saved, load_book_details, add_to_cart, remove_to_cart, checkout, load_shopping_cart, thank_u

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('auth/', include('XShop_Books_App.urls.auth')),
    path('load-books/', load_books, name='load_books'),
    path('account/', include('XShop_Books_App.urls.account')),
    path('sale/', sale, name='sale'),
    path('search-books/', search_books, name='search_books'),
    path('add-saved/', add_saved, name='add_saved'),
    path('remove-saved/<int:pk>/', remove_saved, name='remove_saved'),
    path('load-book-details/<int:pk>/', load_book_details, name='load_book_details'),
    path('add-to-cart/', add_to_cart, name='add_to_cart'),
    path('remove-to-cart/<int:pk>/', remove_to_cart, name='remove_to_cart'),
    path('checkout/', checkout, name='checkout'),
    path('load-shopping-cart/', load_shopping_cart, name='load_shopping_cart'),
    path('thank-u/', thank_u, name='thank_u')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
