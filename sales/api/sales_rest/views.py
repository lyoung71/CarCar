from django.shortcuts import render
from.models import AutomobileVO, Sale, Salesperson, Customer
from django.views.decorators.http import require_http_methods
from json import loads
from django.http import JsonResponse
from .encoders import SaleDetailEncoder, CustomerEncoder, SalespersonEncoder


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleDetailEncoder,
        )
    else:
        content = loads(request.body)
        try:
            automobile_vo_id = content["automobile"]
            automobile_vin = f"/api/automobiles/{automobile_vo_id}/"
            automobile = AutomobileVO.objects.get(href=automobile_vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "invalid automobile VIN"},
                status=400,
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "invalid customer ID"},
                status=400,
            )
        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "invalid salesperson ID"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
            status=200,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def show_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Sale id"},
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {"message": "Invalid Sale id"},
                status=404,
            )
        return JsonResponse({"deleted": True})
    else:
        content = loads(request.body)
        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        content = loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def show_salesperson(request, id):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson id"},
                status=400,
            )
    else:
        content = loads(request.body)
        Salesperson.objects.filter(id=id).update(**content)
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 400
            return response
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=404,
            )
        return JsonResponse({"deleted": True})
    else:
        try:
            content = loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message" : "Does not exist"})
            response.status_code = 404
            return response
