from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=255, unique=True)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=255, unique=True)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    date_time = models.DateTimeField(null=True)
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=255, null=True, default="created")
    vin = models.CharField(max_length=255, unique=True)
    customer = models.CharField(max_length=255)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    vip = models.BooleanField(null=True, default=False)
