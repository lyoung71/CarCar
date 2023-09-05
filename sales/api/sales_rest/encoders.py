from.models import AutomobileVO, Sale, Salesperson, Customer
from common.json import ModelEncoder


class AutomobileDetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["href", "vin", "sold"]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
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
        "automobile": AutomobileDetailEncoder()
    }


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]
