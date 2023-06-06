from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.first_name + self.last_name


class AutomobileVO(models.Model):
    import_id = models.PositiveSmallIntegerField(null=True)
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()

    def __str__(self):
        return self.vin


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=50, default="scheduled")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )
