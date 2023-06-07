from django.urls import path
from .views import list_salespeople, list_customers, list_sales, detail_salesperson, detail_customer, detail_sale

urlpatterns = [
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("salesperson/new/", list_salespeople, name="new_salesperson"),
    path("customers/", list_customers, name="list_customers"),
    path("customer/new/", list_customers, name="list_customer"),
    path("sales/", list_sales, name="list_sales"),
    path("sales/new/", list_sales, name="new_sale"),
    path("salesperson/<int:id>/delete/", detail_salesperson, name="delete_salesperson"),
    path("customer/<int:id>/delete", detail_customer, name="delete_customer"),
    path("sale/<int:id>/delete/", detail_sale, name="delete_sale"),
]
