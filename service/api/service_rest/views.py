import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from .encoders import TechnicianEncoder, AppointmentEncoder
from django.db import IntegrityError

@require_http_methods(["GET","POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {'technicians': technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except IntegrityError:
            return JsonResponse(
                {"message": "Error: Technician ID already in use."},
                status=400
            )

@require_http_methods(["GET","DELETE"])
def one_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Error: Technician does not exist."})
            response.status_code=404
            return response
    else:
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Error: Technician does not exist."},
                status=400,
            )


@require_http_methods(["GET","POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Error: Technician does not exist."},
                status=400,
            )
        vin = content["vin"]
        if AutomobileVO.objects.get(vin=vin):
            content["vip"] = True
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["GET","DELETE"])
def one_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Error: Appointment does not exist."})
            response.status_code = 404
            return response
    else:
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Error: Appointment does not exist."},
                status=400,
                )

@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    try:
        content = json.loads(request.body)
        appointment = Appointment.objects.get(id=id)
        props = [
            "date_time",
            "reason",
            "status",
            "vin",
            "customer",
            "technician"
        ]
        for prop in props:
            if prop in content:
                setattr(appointment, prop, content[prop])
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Error: Appointment does not exist."})
        response.status_code=404
        return response

@require_http_methods(["PUT"])
def finish_appointment(request, id):
    try:
        content = json.loads(request.body)
        appointment = Appointment.objects.get(id=id)
        prop = "status"
        if prop in content:
            setattr(appointment, prop, content[prop])
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Error: Appointment does not exist."})
        response.status_code=404
        return response
