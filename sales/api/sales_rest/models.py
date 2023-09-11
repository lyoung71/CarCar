from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    href = models.CharField(max_length=100, null=True)
    vin = models.CharField(
        max_length=17,
        unique=True
        )
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    employee_id = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.employee_id


class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE
    )
    price = models.IntegerField(
        )

    def get_url(self):
        return reverse("list_sales", kwargs={"id": self.id})
