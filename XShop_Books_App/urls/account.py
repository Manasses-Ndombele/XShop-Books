from django.urls import path
from XShop_Books_App.views import account, change_password, update_user_info

urlpatterns = [
    path('', account, name='account'),
    path('change-password/', change_password, name='change_password'),
    path('update-user-info/', update_user_info, name='update_user_info')
]
