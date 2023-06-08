import React, { useState, useEffect } from "react";

function CreateAutomobile(props) {

    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');

    function handleColorChange(event) {
        const value = event.target.value;
        setColor(value);
    }

    function handleYearChange(event) {
        const value = event.target.value;
        setYear(value);
    }

    function handleVinChange(event) {
        const value = event.target.value;
        setVin(value);
    }

    function handleModelChange(event) {
        const value = event.target.value;
        setModel(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            color,
            year,
            vin,
            model_id: model,
        };

        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile);
            props.getAutomobiles()

            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Automobile</h1>
                    <form onSubmit={handleSubmit} id="create-auto-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Automobile Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleYearChange} value={year} placeholder="YYYY" required type="number" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} value={vin} placeholder="Vehicle ID Number (VIN)" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelChange} value={model} required name="model" id="model" className="form-select">
                                <option value="">Choose a Vehicle Model</option>
                                {props.vehicleModels.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>{model.manufacturer.name + ' ' + model.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAutomobile