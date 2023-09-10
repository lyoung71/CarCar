import React, { useEffect, useState } from "react";


function ListSales(props) {
    const [sales, setSales] = useState([]);

    const handleDelete = async (saleId) => {
        const saleUrl = `http://localhost:8090/api/sales/${saleId}/`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(saleUrl, fetchConfig);

        if (response.ok) {
            console.log("The sale has been deleted");
            loadSales();
        }
    }

    async function loadSales() {
        const response = await fetch("http://localhost:8090/api/sales/");
        if(response.ok) {
            const data = await response.json();
            setSales(data.sales)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadSales()
    }, []);

    return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Automobile VIN</th>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                return (
                <tr key={sale.id}>
                    <td>{ sale.automobile.vin }</td>
                    <td>{ sale.salesperson.employee_id}</td>
                    <td>{ sale.customer.first_name } {sale.customer.last_name} </td>
                    <td>${ sale.price }</td>
                    <td><button type="button" onClick={() => handleDelete(sale.id)}>Delete</button></td>
                </tr>
                );
            })}
            </tbody>
        </table>
        );
}






export default ListSales
