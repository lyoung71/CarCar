import React, { useEffect, useState } from "react";

function ListCustomers() {
    const [customers, setCustomers] = useState([]);

    const handleDelete = async (customerId) => {
        const customerUrl = `http://localhost:8090/api/customers/${customerId}/`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(customerUrl, fetchConfig);

        if (response.ok) {
            console.log("The customer has been deleted");
            loadCustomers();
        }
    }

    async function loadCustomers() {
        const response = await fetch("http://localhost:8090/api/customers/");
        if(response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadCustomers()
    }, []);

    return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Address</th>
                    <th>Phone number</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => {
                return (
                <tr key={customer.id}>
                    <td>{ customer.first_name }</td>
                    <td>{ customer.last_name }</td>
                    <td>{ customer.address }</td>
                    <td>{ customer.phone_number }</td>
                    <td><button type="button" onClick={() => handleDelete(customer.id)}>Delete</button></td>
                </tr>
                );
            })}
            </tbody>
        </table>
        );
}








export default ListCustomers
