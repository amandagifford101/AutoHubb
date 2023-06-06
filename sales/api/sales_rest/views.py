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
    model = Sale
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer,
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SaleListEncoder(ModelEncoder):
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
        "customer": CustomerListEncoder(),
    }
