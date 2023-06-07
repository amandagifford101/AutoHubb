from django.urls import path
from .views import list_salespeople, list_customers, list_sales, detail_salesperson, detail_customer, detail_sale

urlpatterns = [
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("customers/", list_customers, name="list_customers"),
    path("sales/", list_sales, name="list_sales"),
    path("salesperson/<int:id>/delete/", detail_salesperson, name="delete_salesperson"),
    path("customer/<int:id>/delete", detail_customer, name="delete_customer"),
    path("sale/<int:id>/delete/", detail_sale, name="delete_sale"),
]
