import React, { useEffect, useState } from "react";


function ListSalesPersonHistory(props) {
    const [sales, setSales] = useState([]);
    const [salesperson, setSalesperson] = useState("");
    const [salespeople, setSalespeople] = useState([]);

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



    // const filteredList = useMemo(getFilteredList, [salesperson, sales]);

    async function loadSales() {
        const response = await fetch("http://localhost:8090/api/sales/");
        if(response.ok) {
            const data = await response.json();
            console.log(data)
            setSales(data.sales)
        } else {
            console.error(response);
        }
    }

    const fetchSalespeopleData = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    useEffect(() => {
        loadSales();
        fetchSalespeopleData();
    }, []);

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }
    const getFilteredList = () => {
        if (!salesperson) {
            return sales;
        }
        return (sales.filter((sale) => sale.salesperson.employee_id.includes(salesperson)))
    }


    return (
        <>
        <div className="mb-3">
            <select value={salesperson} onChange={handleSalespersonChange} id="salesperson" required name="salesperson" className="form-select">
                <option value={salespeople}>Choose a salesperson</option>
                {salespeople.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.employee_id}>
                            {salesperson.employee_id}
                        </option>
                    );
                })}
            </select>
        </div>
        <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Name</th>
                        <th>Employee ID</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {getFilteredList().map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.salesperson.employee_id}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name} </td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.price}</td>
                                <td><button type="button" onClick={() => handleDelete(sale.id)}>Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>
        );
}

export default ListSalesPersonHistory
