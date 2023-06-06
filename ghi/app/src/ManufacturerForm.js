import React, {useEffect, useState} from 'react';

function ManufacturerForm(props) {
    const [manufacturer, setManufacturer] = useState([]);

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.name = manufacturer;

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);
            // getManufacturer();
            setManufacturer('');
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
                    <h1 className="card-title">Create Manufacturer</h1>
                    <div className="mb-3">
                    </div>
                    <p className="mb-3">
                    Please enter the applicable information to create a new Manufacturer.
                    </p>
                    <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleManufacturerChange} required placeholder="manufacturer" type="text" id="manufacturer" name="manufacturer" value={manufacturer} className="form-control"/>
                        <label htmlFor="manufacturer">Manufacturer Name</label>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Create Manufacturer</button>
                </form>
                {/* <div className="alert alert-success d-none mb-0" id="success-message">
                    Congratulations! You're all organized'
                </div> */}
                </div>
            </div>
            </div>
        </div>
        </div>);
}

export default ManufacturerForm;
