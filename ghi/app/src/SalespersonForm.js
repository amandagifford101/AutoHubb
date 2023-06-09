import React, {useEffect, useState} from 'react';

function SalespersonForm(props) {
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [employeeId, setEmployeeId] = useState([]);

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            
            setFirstName('');
            setLastName('');
            setEmployeeId('');
            props.getSalespeople();
        }

    }

    return (
        <div className="my-5 container">
        <div className="row">
            <div className="col col-sm-auto">
            </div>
            <div className="col">
            <div className="card shadow">
                <div className="card-body">
                <form onSubmit={handleSubmit} id="create-model-form">
                    <h1 className="card-title">Create Salesperson</h1>
                    <div className="mb-3">
                    </div>
                    <p className="mb-3">
                    Please enter the applicable information to create a new Salesperson.
                    </p>
                    <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} required placeholder="First Name" type="text" id="first_name" name="first_name" value={firstName} className="form-control"/>
                        <label htmlFor="first_name">First Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} required placeholder="Last Name" type="text" id="last_name" name="last_name" value={lastName} className="form-control"/>
                        <label htmlFor="last_name">Last Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleEmployeeIdChange} required placeholder="Employee ID" type="text" id="employee_id" name="employee_id" value={employeeId} className="form-control"/>
                        <label htmlFor="employee_id">Employee ID</label>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Create Salesperson</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>);
}

export default SalespersonForm;
