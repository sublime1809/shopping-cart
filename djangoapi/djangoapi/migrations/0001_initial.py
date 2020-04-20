# Generated by Django 3.0.5 on 2020-04-19 19:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='CartFilling',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(null=True)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='djangoapi.Cart')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('src', models.TextField()),
                ('cost', models.FloatField()),
                ('cart', models.ManyToManyField(related_name='items', through='djangoapi.CartFilling', to='djangoapi.Cart')),
            ],
        ),
        migrations.AddField(
            model_name='cartfilling',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='djangoapi.Item'),
        ),
    ]
