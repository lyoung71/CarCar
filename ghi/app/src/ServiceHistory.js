import React, { useEffect, useState } from "react";

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [search, setSearch] = useState('');

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

    const handleSearchChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value);
    };

    const handleButtonClick = () => {
        filteredResults();
    };

    const filterResults = () => {
        const filtered = appointments.filter((appointment) =>
            appointment.vin.filter(search)
        );
        setFilteredResults(filtered);
    };


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date and Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredResults.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.vip }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ appointment.date_time }</td>
                            <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.status }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ServiceHistory;
