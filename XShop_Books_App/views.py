from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http.response import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from django.utils.timezone import datetime
from XShop_Books_App.models import Books, Sales, Coupons, Saved, ShoppingCart
from json import loads

now = datetime.today().date()

def home(request):
    if request.method == 'GET':
        return render(request, 'home.html')

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

def register(request):
    if not request.user.is_authenticated:
        if request.method == 'GET':
            return render(request, 'register.html', {'error': False, 'message': None})

        elif request.method == 'POST':
            email = request.POST.get('email')
            password = request.POST.get('password')
            old_email = User.objects.filter(email=email).count()

            if old_email == 0:
                new_user = User.objects.create_user(username=email.split('@')[0], email=email, password=password)
                new_user.save()
                username = User.objects.get(email=email)
                user = authenticate(request, username=username, password=password)
                auth_login(request, user)
                return redirect('home')

            else:
                return render(request, 'register.html', {'error': True, 'message': 'This email has already been registered on the site. Try another but if you already have an account Make login'})

        else:
            return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

    else:
        return redirect('home')

def login(request):
    if not request.user.is_authenticated:
        if request.method == 'GET':
            return render(request, 'login.html', {'error': False, 'message': None})

        elif request.method == 'POST':
            email = request.POST.get('email')
            password = request.POST.get('password')
            email_exists = User.objects.filter(email=email).count()
            if email_exists == 0:
                return render(request, 'login.html', {'error': True, 'message': 'This email was not found on the site. Try another or if you do not have an account make the registration'})

            else:
                username = User.objects.get(email=email).username
                user = authenticate(request, username=username, password=password)
                try:
                    auth_login(request, user)

                except AttributeError:
                    return render(request, 'login.html', {'error': True, 'message': 'Verify your password!'})

                else:
                    return redirect('home')

        else:
            return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

    else:
        return redirect('home')

@login_required(login_url='/auth/login/')
def logout(request):
    if request.method == 'GET':
        auth_logout(request)
        return redirect('home')

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@ensure_csrf_cookie
def load_books(request):
    if request.method == 'POST':
        fields = loads(request.body)
        requested_by = fields['requestedBy']
        shopping_carts = ShoppingCart.objects.filter(client=request.user.id, buyed=False)
        saveds = Saved.objects.filter(client=request.user.id)
        final_books = []

        if requested_by == 'checkout':
            final_cart = [{
                'id': cart.id,
                'product': cart.product.id,
                'quantity': cart.quantity,
                'price': cart.product.price
            } for cart in shopping_carts]
            products_cart = []
            for product in final_cart:
                products_cart.append(product['product'])

            books = Books.objects.filter(in_stock__gt=0).exclude(id__in=products_cart)[:5]
            final_books = [{
                'id': book.id,
                'coverImage': book.cover_image.url,
                'title': book.title,
                'price': book.price,
                'inStock': book.in_stock,
                'saved': False,
                'savedCategories': []
            } for book in books]
            if saveds.count() > 0:
                for book in final_books:
                    for saved in saveds:
                        if int(saved.product.pk) == int(book['id']):
                            if not book['saved']:
                                book['saved'] = True

                            book['savedCategories'].append(saved.category)

            return JsonResponse({'books': final_books, 'shoppingCart': final_cart, 'shoppingCartNumber': shopping_carts.count()})

        elif requested_by == 'home':
            final_cart = [{
                'id': cart.pk,
                'product': cart.product.id,
                'quantity': cart.quantity,
                'price': cart.product.price
            } for cart in shopping_carts]
            books = Books.objects.filter(in_stock__gt=0)[:10]
            if request.user.is_authenticated:
                if saveds.count() > 0:
                    final_books = [{
                        'id': book.id,
                        'coverImage': book.cover_image.url,
                        'title': book.title,
                        'price': book.price,
                        'inStock': book.in_stock,
                        'saved': False,
                        'savedCategories': []
                    } for book in books]
                    for book in final_books:
                        for saved in saveds:
                            if int(saved.product.pk) == int(book['id']):
                                if not book['saved']:
                                    book['saved'] = True

                                book['savedCategories'].append(saved.category)

                else:
                    final_books = [{
                        'id': book.id,
                        'coverImage': book.cover_image.url,
                        'title': book.title,
                        'price': book.price,
                        'inStock': book.in_stock,
                        'saved': False,
                        'savedCategories': []
                    } for book in books]

            else:
                final_books = [{
                    'id': book.id,
                    'coverImage': book.cover_image.url,
                    'title': book.title,
                    'price': book.price,
                    'inStock': book.in_stock
                } for book in books]

            return JsonResponse({'books': final_books, 'shoppingCart': final_cart, 'shoppingCartNumber': shopping_carts.count()})

        elif requested_by == 'home_more':
            loaded_books = fields['loadedBooks']
            books = Books.objects.filter(in_stock__gt=0).exclude(id__in=loaded_books)[:10]
            final_books = [{
                'id': book.id,
                'coverImage': book.cover_image.url,
                'title': book.title,
                'price': book.price,
                'inStock': book.in_stock,
                'saved': False,
                'savedCategories': []
            } for book in books]
            if saveds.count() > 0:
                for book in final_books:
                    for saved in saveds:
                        if int(saved.product.pk) == int(book['id']):
                            if not book['saved']:
                                book['saved'] = True

                            book['savedCategories'].append(saved.category)

            return JsonResponse({'books': final_books, 'shoppingCartNumber': shopping_carts.count()})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def account(request):
    if request.method == 'GET':
        coupons = Coupons.objects.filter(expiration_date__lte=now)
        saved = Saved.objects.filter(client=request.user.id, category='saved')
        favourites = Saved.objects.filter(client=request.user.id, category='favorite')
        purchases = Sales.objects.filter(buyer=request.user.id)

        return render(
            request,
            'user-data.html',
            {
                'coupons': coupons,
                'saveds': saved,
                'favorites': favourites,
                'purchases': purchases
            }
        )

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def sale(request):
    if request.method == 'POST':
        fields = loads(request.body)
        shopping_cart = fields['shopping_cart']
        client_datas = fields['client_datas']
        total = 0
        if client_datas['coupon'] != '':
            coupon = get_object_or_404(Coupons, pk=client_datas['coupon'])
            new_sale = Sales.objects.create(buyer=request.user, total=total, coupon=coupon)

        else:
            new_sale = Sales.objects.create(buyer=request.user, total=total)

        for _cart in shopping_cart:
            book = get_object_or_404(Books, pk=_cart['product'])
            cart = get_object_or_404(ShoppingCart, pk=_cart['id'])
            total += float(book.price * cart.quantity)
            book.in_stock -= cart.quantity
            cart.buyed = True
            new_sale.products.add(cart)
            book.save()
            cart.save()

        new_sale.total = total
        new_sale.save()
        return JsonResponse({'success': True})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def change_password(request):
    if request.method == 'UPDATE':
        fields = loads(request.body)
        old_password = fields['old_password']
        new_password = fields['new_password']
        user = User.objects.get(pk=request.user.id)
        if user.check_password(raw_password=old_password):
            user.set_password(new_password)
            user.save()
            return redirect('logout')

        else:
            return JsonResponse({'success': False})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def update_user_info(request):
    if request.method == 'UPDATE':
        fields = loads(request.body)
        username = fields['username']
        email = fields['email']
        user = User.objects.get(pk=request.user.id)
        if username != user.username:
            other_username = User.objects.filter(username=username).count()
            if other_username == 0:
                user.username = username

            else:
                return JsonResponse({'success': False, 'message': f'Your new username cannot be applied because other user is already using: {username}'})

        if email != user.email:
            other_email = User.objects.filter(email=email).count()
            if other_email == 0:
                user.email = email

            else:
                return JsonResponse({'success': False, 'message': f'Your new email cannot be applied because other user is already using {email}'})

        user.save()
        return JsonResponse({'success': True, 'message': 'Your account data was changed successfully!', 'username': username, 'email': email})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

def search_books(request):
    if request.method == 'POST':
        search_value = loads(request.body)['search_value']
        matching_books = Books.objects.filter(in_stock__gt=0, title__icontains=search_value)[:10]
        shopping_cart_number = ShoppingCart.objects.filter(client=request.user.id, buyed=False).count()
        saveds = Saved.objects.filter(client=request.user.id)
        found = bool(matching_books)
        serialized_books = [
            {
                'id': book.pk,
                'coverImage': book.cover_image.url,
                'title': book.title,
                'inStock': book.in_stock,
                'price': book.price,
                'saved': False,
                'savedCategories': []
            }

            for book in matching_books
        ]
        if saveds.count() > 0:
            for book in serialized_books:
                for saved in saveds:
                    if int(saved.product.pk) == int(book['id']):
                        if not book['saved']:
                            book['saved'] = True

                        book['savedCategories'].append(saved.category)

        return JsonResponse({'found': found, 'matching_books': serialized_books, 'shopping_cart_number': shopping_cart_number})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def add_saved(request):
    if request.method == 'POST':
        fields = loads(request.body)
        category = fields['category']
        product = get_object_or_404(Books, pk=fields['product'])
        new_saved = Saved.objects.create(category=category, product=product, client=request.user)
        new_saved.save()
        return JsonResponse({'success': True, 'saved': new_saved.pk})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def remove_saved(request, pk):
    if request.method == 'DELETE':
        saved = get_object_or_404(Saved, pk=pk)
        saved.delete()
        return JsonResponse({'success': True})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

def load_book_details(request, pk):
    if request.method == 'POST':
        book = get_object_or_404(Books, pk=pk)
        final_book = {
            'subtitle': book.subtitle,
            'author': book.author,
            'releaseDate': book.release_date,
            'editor': book.editor,
            'edition': book.edition,
            'description': book.description
        }

        return JsonResponse({'book': final_book})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def add_to_cart(request):
    if request.method == 'POST':
        fields = loads(request.body)
        book = get_object_or_404(Books, pk=fields['product'])
        shopping_cart = ShoppingCart.objects.create(product=book, client=request.user, quantity=fields['quantity'])
        shopping_cart.save()
        return JsonResponse({'success': True, 'cart_id': shopping_cart.pk})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def remove_to_cart(request, pk):
    if request.method == 'DELETE':
        shopping_cart = get_object_or_404(ShoppingCart, pk=pk, buyed=False)
        shopping_cart.delete()
        return JsonResponse({'success': True})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def checkout(request):
    if request.method == 'GET':
        coupons = Coupons.objects.filter(expiration_date__lte=now)
        return render(request, 'checkout.html', {'coupons': coupons, 'couponsNumber': coupons.count()})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def load_shopping_cart(request):
    if request.method == 'POST':
        shopping_cart = ShoppingCart.objects.filter(client=request.user.id, buyed=False)
        final_cart = [{
            'id': cart.product.pk,
            'coverImage': cart.product.cover_image.url,
            'title': cart.product.title,
            'price': cart.product.price,
            'quantity': cart.quantity
        } for cart in shopping_cart]
        return JsonResponse({'shoppingCart': final_cart})

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')

@login_required(login_url='/auth/login/')
def thank_u(request):
    if request.method == 'GET':
        return render(request, 'thank-u.html')

    else:
        return HttpResponseBadRequest('<h1>It was not possible to open this page</h1>')
