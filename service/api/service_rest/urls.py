from django.urls import path
from .views import (
    api_technicians,
    api_get_technician,
    api_appointments,
    api_get_appointment,
    api_cancel_appointment,
    api_finish_appointment,
)


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_get_technician, name="api_get_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:id>/", api_get_appointment, name="api_get_appointment"),
    path("appointments/<int:id>/cancel/", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<int:id>/finish/", api_finish_appointment, name="api_finish_appointment"),
]
