from django.urls import path
from .views import list_technicians, one_technician, list_appointments, one_appointment, cancel_appointment, finish_appointment

urlpatterns=[
    path('technicians/', list_technicians, name="list_technicians"),
    path('technicians/<int:id>/', one_technician, name="one_technician"),
    path('appointments/', list_appointments, name="list_appointments"),
    path('appointments/<int:id>/', one_appointment, name="one_appointment"),
    path('appointments/<int:id>/cancel/', cancel_appointment, name="cancel_appointment"),
    path('appointments/<int:id>/finish/', finish_appointment, name="finish_appointment"),
]
