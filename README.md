# CarCar

Team:

* Landon - Sales
* Daniel - Services

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

I created models for AutomobileVO, Technician, and Appointment. I created encoders based on these models to shorten the code, and I implemented list/create/delete functions for technicians and appointments, as well as specific PUT functions to change the status of an appointment to either canceled or finished.

The AutomobileVO and Appointment would interact with regards to the VIP status/filtered results for the special features using matching VINs to determine if an appointment would be marked as VIP and whether the appointment would show up in the history of services, respectivelly.

## Sales microservice

Models will include a sale, customer, salesperson, and automobileVO objects. Will use poller to pull automobile data from the inventory microservice/API.
