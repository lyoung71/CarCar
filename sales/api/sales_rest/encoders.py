from.models import AutomobileVO, Sale, Salesperson, Customer
from common.json import ModelEncoder


class AutomobileDetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["href", "vin", "sold"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]

    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.id,
            "salesperson": o.salesperson.id,
            "customer": o.customer.id
        }


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileDetailEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }
