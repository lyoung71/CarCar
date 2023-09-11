import React, { useEffect, useState } from "react";

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])

    const [formData, setFormData] = useState({
        date_time: "",
        reason: "",
        vin: "",
        technician: "",
        customer: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const appointmentsResponse = await fetch(appointmentsUrl, fetchConfig);
        if (appointmentsResponse.ok) {
            setFormData({
                date_time: "",
                reason: "",
                vin: "",
                technician: "",
                customer: ""
            });
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData(formData=>({
            ...formData,
            [inputName]: value
        }));
    }

    const fetchData = async () => {
        const techniciansUrl = 'http://localhost:8080/api/technicians/';
        const techniciansResponse = await fetch(techniciansUrl);
        if(techniciansResponse.ok) {
            const data = await techniciansResponse.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input value={formData.date_time} onChange={handleFormChange} placeholder="YYYY-MM-DD HH:MM" required type="datetime" name="date_time" id="date_time" className="form-control"></input>
                            <label htmlFor="date_time">Date and Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.reason} onChange={handleFormChange} placeholder="reason" required type="text" name="reason" id="reason" className="form-control"></input>
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.vin} onChange={handleFormChange} placeholder="vin" required type="text" name="vin" id="vin" className="form-control"></input>
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleFormChange} required name="technician" id="technician" className="form-select">
                                <option value={formData.technician}>Choose a technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.customer} onChange={handleFormChange} placeholder="customer" required type="text" name="customer" id="customer" className="form-control"></input>
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;
