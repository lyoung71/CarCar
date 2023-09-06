import React, { useEffect, useState } from "react";


function ListSalespeople() {
    const [salespeople, setSalespeople] = useState([]);

    const handleDelete = async (salespersonId) => {
        const salespersonUrl = `http://localhost:8090/api/salespeople/${salespersonId}/`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(salespersonUrl, fetchConfig);

        if (response.ok) {
            console.log("The salesperson has been deleted");
            loadSalespeople();
        }
    }

    async function loadSalespeople() {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if(response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadSalespeople()
    }, []);

    return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Emploee ID</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map(salesperson => {
                return (
                <tr key={salesperson.id}>
                    <td>{ salesperson.first_name }</td>
                    <td>{ salesperson.last_name }</td>
                    <td>{ salesperson.employee_id }</td>
                    <td><button type="button" onClick={() => handleDelete(salesperson.id)}>Delete</button></td>
                </tr>
                );
            })}
            </tbody>
        </table>
        );
}



export default ListSalespeople
