import json

from django import views
from django.http import JsonResponse

from djangoapi import models


class CartView(views.generic.ListView, views.generic.CreateView, views.generic.UpdateView):
    def get(self, request, cart_pk=None, *args, **kwargs):
        if cart_pk:
            cart = models.Cart.objects.get(pk=cart_pk)
        else:
            cart = models.Cart.objects.all().first()
        if not cart:
            cart = models.Cart.objects.create()
        fillings = models.CartFilling.objects.filter(cart=cart)
        return JsonResponse({
            'id': cart.pk,
            'items': [
                {'quantity': filling.quantity,
                 'item': filling.item.jsonify()}
                for filling in fillings]
        })

    def post(self, request, cart_pk=None, *args, **kwargs):
        if not cart_pk:
            return JsonResponse({'error': 'Must specify cart id to update.'})
        data = json.loads(request.body)
        items = data.get('items')
        for item in items:
            filling, created = models.CartFilling.objects.get_or_create(cart__pk=cart_pk, item__pk=item['id'],
                                                                        defaults={'quantity': 1})
            if not created:
                filling.quantity = filling.quantity + 1
                filling.save()
        fillings = models.CartFilling.objects.filter(cart__pk=cart_pk)
        return JsonResponse({
            'id': cart_pk,
            'items': {
                filling.item.pk:
                    {'quantity': filling.quantity, 'item': filling.item.jsonify()}
                for filling in fillings}
        })

    def put(self, request, *args, **kwargs):
        cart = models.Cart.objects.create()
        return JsonResponse({
            'id': cart.pk,
            'items': []
        })


class ItemView(views.generic.ListView):
    def get(self, request, item_pk=None, *args, **kwargs):
        if item_pk:
            items = models.Item.objects.filter(pk=item_pk)
        else:
            items = models.Item.objects.all()
        response = [{
            'id': item.pk,
            'name': item.name,
            'cost': item.cost,
            'src': item.src
        } for item in items]
        return JsonResponse({'items': response})


class CartItemView(views.generic.UpdateView):
    def get_queryset(self):
        return None

    def post(self, request, pk, item_pk, *args, **kwargs):
        data = json.loads(request.body)
        quantity = data.get('quantity')
        filling, created = models.CartFilling.objects.get_or_create(cart_id=pk, item_id=item_pk)
        if quantity:
            filling.quantity = quantity
            filling.save()
        else:
            filling.delete()
        fillings = models.CartFilling.objects.filter(cart__pk=pk)
        return JsonResponse({
            'id': pk,
            'items': {
                filling.item.pk:
                    {'quantity': filling.quantity, 'item': filling.item.jsonify()}
                for filling in fillings}
        })
