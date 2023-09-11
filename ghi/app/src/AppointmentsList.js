import React, { useEffect, useState } from "react";

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    const loadAppointments = async () => {
        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const appointmentsResponse = await fetch(appointmentsUrl);
        if (appointmentsResponse.ok) {
            const data = await appointmentsResponse.json();
            setAppointments(data.appointments);
        }
    };

    useEffect(() => {
        loadAppointments()
    }, []);

    const deleteAppointment = async (appointmentId) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointmentId}`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const appointmentResponse = await fetch(appointmentUrl, fetchConfig);
        if (appointmentResponse.ok) {
            console.log("Appointment successfully deleted!");
            loadAppointments();
        }
    };

    const cancelAppointment = async (appointmentId) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({"status": "canceled"}),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const appointmentResponse = await fetch(appointmentUrl, fetchConfig);
        if (appointmentResponse.ok) {
            loadAppointments();
        }
    };

    const finishAppointment = async (appointmentId) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointmentId}/finish/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({"status": "finished"}),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const appointmentResponse = await fetch(appointmentUrl, fetchConfig);
        if (appointmentResponse.ok) {
            loadAppointments();
        }
    };


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Date and Time</th>
                    <th>Reason</th>
                    <th>VIN</th>
                    <th>Technician</th>
                    <th>Customer</th>
                    <th>Is VIP?</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.date_time }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ appointment.vip }</td>
                            <td><button type="button" onClick={() => finishAppointment(appointment.id)}>Finish</button></td>
                            <td><button type="button" onClick={() => cancelAppointment(appointment.id)}>Cancel</button></td>
                            <td><button type="button" onClick={() => deleteAppointment(appointment.id)}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default AppointmentList;
