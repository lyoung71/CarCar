import React, { useEffect, useState } from "react";

function AutomobileForm () {
    const[models, setModels] = useState([]);

    const [formData, setFormData] = useState({
        vin: "",
        color: "",
        year: "",
        model: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                vin: "",
                color: "",
                year: "",
                model: "",
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

    const fetchModelsData = async () => {
        const modelsUrl = "http://localhost:8100/api/models/";
        const response = await fetch(modelsUrl);
        if(response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchModelsData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new automobile</h1>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                                <input value = {formData.vin} onChange={handleFormChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                                <label htmlFor="vin">VIN</label>
                            </div>
                        <div className="form-floating mb-3">
                            <input value = {formData.color} onChange={handleFormChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value = {formData.year} onChange={handleFormChange} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.model} onChange={handleFormChange} required name="model" id="model" className="form-select">
                                <option value=""> Choose a model </option>
                                {models.map(model=> {
                                    return (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
        );
}

export default AutomobileForm
