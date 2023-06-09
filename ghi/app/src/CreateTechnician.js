import React, { useState } from "react";


function CreateTechnician(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    function handleFirstNameChange(event) {
        const value = event.target.value;
        setFirstName(value);
    }

    function handleLastNameChange(event) {
        const value = event.target.value;
        setLastName(value);
    }

    function handleEmployeeIDChange(event) {
        const value = event.target.value;
        setEmployeeID(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            employee_id: employeeID,
            first_name: firstName,
            last_name: lastName,
        };

        const technicianUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            
            setFirstName('');
            setLastName('');
            setEmployeeID('');
            props.getTechnicians();
        };
    }


    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} value={firstName} required type="text" name="firstName" id="firstName" className="form-control" />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} value={lastName} required type="text" name="lastName" id="lastName" className="form-control" />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeIDChange} value={employeeID} required type="text" name="employeeID" id="employeeID" className="form-control" />
                            <label htmlFor="employeeID">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTechnician
