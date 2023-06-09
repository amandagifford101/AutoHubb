import React, {useEffect, useState} from 'react';

function SaleForm(props) {

    const [customers, setCustomers] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    // const [automobile, setAutomobile] = useState("");
    const [customer, setCustomer] = useState("");
    const [salesperson, setSalesperson] = useState("");
    const [price, setPrice] = useState("");
    const [filteredAutomobiles, setFilteredAutomobiles] = useState([]);
    const [filteredAutomobile, setFilteredAutomobile] = useState("");

    const filterAutomobiles = () => {
        const filteredList = props.automobiles.filter(automobile => automobile.sold === false);
        setFilteredAutomobiles(filteredList);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleFilteredAutomobileChange = (event) => {
        const value = event.target.value;
        setFilteredAutomobile(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    async function getCustomers() {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    async function getSalespeople() {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salesperson);
        }
    }

    useEffect(() => {
        filterAutomobiles();
    }, [props.automobiles]);

    useEffect(() => {
        getCustomers();
        getSalespeople();
    }, []);




    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.customer = customer;
        data.automobile = filteredAutomobile;
        data.salesperson = salesperson;
        data.price = price;
        const salesUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            
            setCustomer('');
            setFilteredAutomobile('');
            setSalesperson('');
            setPrice('');
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
                    <h1 className="card-title">Create Sale</h1>
                    <div className="mb-3">
                    </div>
                    <p className="mb-3">
                    Please enter the applicable information to create a new Sale.
                    </p>
                    <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handlePriceChange} required placeholder="Price" type="text" id="price" name="price" value={price} className="form-control"/>
                        <label htmlFor="price">Price</label>
                        </div>
                    </div>
                    <div className="col">
                    <div className="mb-3">
                            <select onChange={handleFilteredAutomobileChange} value={filteredAutomobile} required name="automobile" id="automobile" className="form-select">
                                <option value="">Choose an automobile</option>
                                {filteredAutomobiles.map(automobile => {
                                    return (
                                        <option key={automobile.id} value={automobile.id}>{ automobile.year } { automobile.model.name }</option>
                                    );
                                })}
                            </select>
                        </div>
                        </div>
                    <div className="mb-3">
                            <select onChange={handleCustomerChange} value={customer} required name="customer" id="customer" className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    <div className="mb-3">
                            <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-lg btn-primary">Create Sale</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>);
}

export default SaleForm;
