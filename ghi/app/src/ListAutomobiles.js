import React, { useEffect, useState } from "react";


function ListAutomobiles() {
    const [automobiles, setAutomobiles] = useState([]);

    const handleDelete = async (automobileId) => {
        const automobileUrl = `http://localhost:8100/api/automobiles/${automobileId}/`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(automobileUrl, fetchConfig);

        if (response.ok) {
            loadAutomobiles();
        }
    }

    async function loadAutomobiles() {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if(response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadAutomobiles()
    }, []);

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Sold</th>
            </tr>
        </thead>
        <tbody>
            {automobiles.map(automobile => {
            return (
            <tr key={automobile.id}>
                <td>{ automobile.vin }</td>
                <td>{ automobile.color }</td>
                <td>{ automobile.year }</td>
                <td>{ automobile.model.name }</td>
                <td>{ automobile.model.manufacturer.name }</td>
                <td>{ automobile.sold === true ? "Yes" : "No"}</td>
                <td><button type="button" onClick={() => handleDelete(automobile.id)}>Delete</button></td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default ListAutomobiles
