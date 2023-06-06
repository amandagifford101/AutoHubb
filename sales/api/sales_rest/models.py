from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()
    import_id= models.PositiveSmallIntegerField(null=True)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.first_name + self.last_name

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)


    def __str__(self):
        return self.first_name

class Sale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.PROTECT,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT,
    )
