import React, { useState } from "react";

function AppointmentHistory(props) {

    let listedAppts = props.appointments

    const [searchedVin, setSearchedVin] = useState('')


    function handleSearch(event) {
        const value = event.target.value;
        setSearchedVin(value);
    }

    function handleSearchSubmit() {
        const filteredAppts = props.appointments.filter(appointment => appointment.vin === searchedVin)
        if (searchedVin) {
            listedAppts = filteredAppts
        }
    }

    function isVip(vin) {
        let sold = []
        for (const automobile of props.automobiles) {
            if (vin === automobile.vin) {
                sold.push(vin)
            }
        }
        if (sold.length > 0 ){
            return "Yes"
        }
        else {
            return "No"
        }
    }

    function getDate(datetime) {
        const date = new Date(datetime);
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();
        const fullDate = (month+1) + "/" + day + "/" + year;
        return fullDate
    }

    function getTime(datetime) {
        const date = new Date(datetime);
        const timestamp = date.getTime();
        const convertTime = new Date(timestamp)
        const time = convertTime.toLocaleTimeString("en-US")
        return time
    }

    return (
        <>
        <h1>Service History</h1>
        <div className="input-group mb-3">
            <form onSubmit={handleSearchSubmit()} >
                <input type="text" value={searchedVin} onChange={handleSearch} className="form-control" placeholder="Filter list by VIN" name="search" id="search" aria-describedby="inputGroup-sizing-default" />
            </form>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {listedAppts.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ isVip(appointment.vin) }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ getDate(appointment.date_time) }</td>
                            <td>{ getTime(appointment.date_time) }</td>
                            <td>{ appointment.technician.first_name } {appointment.technician.last_name}</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.status }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}

export default AppointmentHistory