# Generated by Django 4.0.3 on 2023-09-07 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0006_remove_automobilevo_href'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='href',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
