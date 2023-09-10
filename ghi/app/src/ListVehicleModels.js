import React, { useEffect, useState } from "react";
import "./index.css"
function ListVehicleModels() {

    const [models, setModels] = useState([]);

    const handleDelete = async (modelId) => {
        const modelUrl = `http://localhost:8100/api/models/${modelId}/`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(modelUrl, fetchConfig);

        if (response.ok) {
            console.log("The model has been deleted");
            loadModels();
        }
    }

    async function loadModels() {
        const response = await fetch("http://localhost:8100/api/models/");
        if(response.ok) {
            const data = await response.json();
            setModels(data.models)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadModels()
    }, []);

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture </th>
            </tr>
        </thead>
        <tbody>
            {models.map(model => {
            return (
            <tr key={model.id}>
                <td>{ model.name }</td>
                <td>{ model.manufacturer.name }</td>
                <td> <img className="image" src={ model.picture_url }/></td>
                <td><button type="button" onClick={() => handleDelete(model.id)}>Delete</button></td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default ListVehicleModels
