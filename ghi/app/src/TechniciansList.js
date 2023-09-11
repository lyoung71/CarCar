import React, { useEffect, useState } from "react";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const loadTechnicians = async () => {
        const techniciansUrl = 'http://localhost:8080/api/technicians/';
        const techniciansResponse = await fetch(techniciansUrl);
        if (techniciansResponse.ok) {
            const data = await techniciansResponse.json();
            setTechnicians(data.technicians);
        }
    };

    useEffect(() => {
        loadTechnicians()
    }, []);

    const deleteTechnician = async (technicianId) => {
        const technicianUrl = `http://localhost:8080/api/technicians/${technicianId}`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const technicianResponse = await fetch(technicianUrl, fetchConfig);
        if (technicianResponse.ok) {
            console.log("Technician successfully deleted!");
            loadTechnicians();
        }
    };


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
                            <td>{ technician.employee_id }</td>
                            <td><button type="button" onClick={() => deleteTechnician(technician.id)}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TechnicianList;
