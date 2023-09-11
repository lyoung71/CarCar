import React, { useEffect, useState } from "react";

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchChange(value);
    };

    const handleButtonClick = () => {
        filteredResults();
    };

    const filterResults = () => {
        const filtered = appointments.filter((appointment) =>
            appointment.vin)

    }
}
