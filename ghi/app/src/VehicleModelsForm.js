import React, {useEffect, useState} from 'react';

function VehicleModelForm(props) {
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            setManufacturers(data.manufacturers);
        }
    }

    useEffect (() => {
        fetchData();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }




    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.manufacturer_id = manufacturer;
        data.picture_url = pictureUrl;
        data.name = name;

        const vehicleModelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(vehicleModelUrl, fetchConfig);
        if (response.ok) {

            setName('');
            setManufacturer('');
            setPictureUrl('');
            props.getVehicleModels();
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
                    <h1 className="card-title">Create Vehicle Model</h1>
                    <div className="mb-3">
                    </div>
                    <p className="mb-3">
                    Please enter the applicable information to create a new vehicle model.
                    </p>
                    <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleNameChange} required placeholder="model_name" type="text" id="name" name="name" value={name} className="form-control"/>
                        <label htmlFor="modelName">Name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handlePictureUrlChange}required placeholder="picture_url" type="text" id="picture_url" name="picture_url" value={pictureUrl} className="form-control"/>
                        <label htmlFor="image_url">Image Url</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <select onChange={handleManufacturerChange} value={manufacturer} name="manufacturer" id="manufacturer" className="form-select">
                        <option value="">Manufacturer</option>
                            {
                                manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                    )
                                })
                            }
                        </select>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Create Vehicle Model</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>);
}

export default VehicleModelForm;
