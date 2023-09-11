import React, { useEffect, useState } from "react";

function TechnicianForm() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        employee_id: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const techniciansUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const techniciansResponse = await fetch(techniciansUrl, fetchConfig);
        if (techniciansResponse.ok) {
            setFormData({
                first_name: "",
                last_name: "",
                employee_id: ""
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

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input value={formData.first_name} onChange={handleFormChange} placeholder="first name" required type="text" name="first_name" id="first_name" className="form-control"></input>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.last_name} onChange={handleFormChange} placeholder="last name" required type="text" name="last_name" id="last_name" className="form-control"></input>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.employee_id} onChange={handleFormChange} placeholder="employee id" required type="text" name="employee_id" id="employee_id" className="form-control"></input>
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TechnicianForm;
