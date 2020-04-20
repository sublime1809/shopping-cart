from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=50)
    src = models.TextField()
    cart = models.ManyToManyField('Cart', through='CartFilling', related_name='items')
    cost = models.FloatField()

    def jsonify(self):
        return {'name': self.name, 'src': self.src, 'cost': self.cost}


class Cart(models.Model):
    pass


class CartFilling(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField(null=True)

    class Meta:
        unique_together = [['item', 'cart']]
