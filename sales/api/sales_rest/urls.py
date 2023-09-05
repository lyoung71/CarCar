from django.urls import path, include
from .views import (list_sales, show_sale, list_salespeople,
    show_salesperson, list_customers, show_customer)

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),
    path("sales/<int:id>/", show_sale, name="show_sale"),
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("salespeople/<int:id>/", show_salesperson, name="show_salesperson"),
    path("customers/", list_customers, name="list_customers"),
    path("customers/<int:id>/", show_customer, name="show_customer"),
]
