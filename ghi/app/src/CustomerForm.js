import React, {useEffect, useState} from 'react';

function CustomerForm(props) {
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [address, setAddress] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState([]);

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const customerUrl = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            // getSalesperson();
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
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
                    <h1 className="card-title">Create Customer</h1>
                    <div className="mb-3">
                    </div>
                    <p className="mb-3">
                    Please enter the applicable information to create a new Customer.
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
                        <input onChange={handleAddressChange} required placeholder="Address" type="text" id="address" name="address" value={address} className="form-control"/>
                        <label htmlFor="address">Address</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handlePhoneNumberChange} required placeholder="Phone Number" type="text" id="phone_number" name="phone_number" value={phoneNumber} className="form-control"/>
                        <label htmlFor="phone_number">Phone Number</label>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Create Customer</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>);
}

export default CustomerForm;
