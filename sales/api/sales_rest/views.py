from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Sale, Salesperson, Customer
from django.db import IntegrityError
import json
from common.json import ModelEncoder
# Create your views here.

class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_id",
        "sold",
    ]

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class CustomersListEncoder(ModelEncoder):
    model = Customer,
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]

class SalesListEncoder(ModelEncoder):
    model = Sale,
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOListEncoder(),
        "salesperson": SalespersonListEncoder(),
        "customer": CustomersListEncoder(),
    }

@require_http_methods(["GET", "POST"])
def list_salespeople(request, id=None):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salespeople},
            encoder=SalespersonListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        salesperson = Salesperson.objects.create(**content)

        return JsonResponse(
            salesperson,
            encoder=SalespersonListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_customers(request, id=None):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomersListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomersListEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def list_sales(request, id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            automobile = AutomobileVO.objects.get(import_id=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"Message": "Automobile not working properly"},
                status=400,
            )
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"Message": "Salesperson not working properly"},
                status=400,
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"Message": "Customer not working properly"},
                status=400,
            )

        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SalesListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def detail_salesperson(request, id):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse({"message": f"{salesperson} has been deleted"})
        except Salesperson.DoesNotExist:
            print("Salesperson does not exist")
            return JsonResponse({"message": "salesperson does not exist"}, status=400)

@require_http_methods(["DELETE"])
def detail_customer(request, id):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse({"message": f"{customer} has been deleted"})
        except Customer.DoesNotExist:
            print("Customer does not exist")
            return JsonResponse({"message": "customer does not exist"}, status=400)


@require_http_methods(["DELETE"])
def detail_sale(request, id):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse({"message": f"{sale} has been deleted"})
        except Sale.DoesNotExist:
            print("Sale does not exist")
            return JsonResponse({"message": "sale does not exist"}, status=400)
