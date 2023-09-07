import React, { useEffect, useState } from "react";

function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([]);

    const handleDelete = async (manufacturerId) => {
        const manufacturerUrl = `http://localhost:8100/api/manufacturers/${manufacturerId}/`;
        const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(manufacturerUrl, fetchConfig);

        if (response.ok) {
            console.log("The manufacturer has been deleted");
            loadManufacturers();
        }
    }

    async function loadManufacturers() {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if(response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadManufacturers()
    }, []);

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Manufacturer</th>
            </tr>
        </thead>
        <tbody>
            {manufacturers.map(manufacturer => {
            return (
            <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>
                <td><button type="button" onClick={() => handleDelete(manufacturer.id)}>Delete</button></td>
            </tr>
            );
        })}
        </tbody>
    </table>
    );
}




export default ListManufacturers
