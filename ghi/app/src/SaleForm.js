import React, { useEffect, useState} from "react";

function SaleForm () {
    const[automobiles, setAutomobiles] = useState([]);
    const[salespeople, setSalespeople] = useState([]);
    const[customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        automobile: "",
        salesperson: "",
        customer: "",
        price: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const saleUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                automobile: "",
                salesperson: "",
                customer: "",
                price: "",
            });
        }


        const automobileUrl = `http://localhost:8100/api/automobiles/${formData.automobile}/`;
        const fetchSoldStatusConfig = {
            method: "put",
            body: JSON.stringify({sold: true}),
            headers: {
                "Content-Type": "application/json"
            },
        };
        const soldResponse = await fetch (automobileUrl, fetchSoldStatusConfig);
        if (soldResponse.ok) {
            setAutomobiles(automobiles => automobiles.map(automobile => {
                if (automobile.vin === formData.automobile) {
                    return {
                        ...automobile,
                        sold: true
                    }
                }
                return automobile
            })
            )
    }}


    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;


        setFormData(formData=>({
            ...formData,
            [inputName]: value
        }));
    }

    const fetchSalespeopleData = async () => {
        const salespeopleUrl = "http://localhost:8090/api/salespeople/";
        const response = await fetch(salespeopleUrl);
        if(response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    const fetchAutomobileData = async () => {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(automobileUrl);
        if(response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    }

    const fetchCustomerData = async () => {
        const customersUrl = "http://localhost:8090/api/customers/";
        const response = await fetch(customersUrl);
        if(response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }


    useEffect(() => {
        fetchAutomobileData();
        fetchCustomerData();
        fetchSalespeopleData();
    }, []);

    const filteredAutomobiles = automobiles.filter(automobile => {
        return automobile.sold === false;
    });

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="mb-3">
                            <select value= {formData.automobile} onChange={handleFormChange} required name="automobile" id="automobile" className="form-select">
                                <option value=""> Choose an automobile</option>
                                {filteredAutomobiles.map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={formData.salesperson} onChange={handleFormChange} required name="salesperson" id="salesperson" className="form-select">
                                <option value=""> Choose a salesperson</option>
                                {salespeople.map(salesperson=> {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>{salesperson.employee_id}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={formData.customer} onChange={handleFormChange} required name="customer" id="customer" className="form-select">
                                <option value=""> Choose a customer</option>
                                {customers.map(customer=> {
                                    return (
                                        <option key={customer.id} value={customer.id}>{customer.first_name + " " + customer.last_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value = {formData.price} onChange={handleFormChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
        </>
        );
}

export default SaleForm
