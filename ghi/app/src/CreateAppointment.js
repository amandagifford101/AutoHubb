import React, { useState } from "react";

function CreateAppointment(props) {

    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');

    function handleVinChange(event) {
        const value = event.target.value;
        setVin(value);
    }

    function handleCustomerChange(event) {
        const value = event.target.value;
        setCustomer(value);
    }

    function handleDateTimeChange(event) {
        const value = event.target.value;
        setDateTime(value);
    }

    function handleTechnicianChange(event) {
        const value = event.target.value;
        setTechnician(value);
    }

    function handleReasonChage(event) {
        const value = event.target.value;
        setReason(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            vin,
            customer,
            date_time: dateTime,
            technician,
            reason,
        };

        const apptUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(apptUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            props.getAppointments()

            setVin('');
            setCustomer('');
            setDateTime('');
            setTechnician('');
            setReason('');
        }
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-auto-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} value={vin} required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Automobile VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCustomerChange} value={customer} placeholder="First Name Last Name" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleDateTimeChange} value={dateTime} placeholder="mm/dd/yyyy" required type="datetime-local" name="datetime" id="datetime" className="form-control" />
                            <label htmlFor="datetime">Date and Time</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} value={technician} required name="technician" id="technician" className="form-select">
                                <option value="">Assigned Technician</option>
                                {props.technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>{technician.first_name + ' ' + technician.last_name + ' #' + technician.employee_id}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleReasonChage} value={reason} required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAppointment
