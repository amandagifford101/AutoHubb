import React, { useState, useEffect } from 'react';

function SalesList(props) {
    // const [hasDeleted, setHasDeleted] = useState([false]);
    let tableClasses = 'table table-striped table-hover';

    const [ sales, setSales ] = useState([]);
    const [ salespeople, setSalespeople ] = useState([]);
    const [ searchedSalesperson, setSearchedSalesperson ] = useState("");
    const [ allSales, setAllSales ] = useState([]);


    const handleSalespersonFilterChange = () => {
        const filteredSales = allSales.filter(sale => sale.salesperson.id === parseInt(searchedSalesperson));

        if (searchedSalesperson) {
            setSales(filteredSales);
        }
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSearchedSalesperson(value);
        // console.log(value);
        // console.log(searchedSalesperson);
    }
    async function getSales() {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setSales(data.sales);
            setAllSales(data.sales);
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
        handleSalespersonFilterChange();
    },[searchedSalesperson, allSales]);
    

    useEffect(() => {
        getSales();
        getSalespeople();
    }, [])

    const deleteSale = (id) => async () => {

        try {
            const response = await fetch(`http://localhost:8090/api/sale/${id}/delete/`, {
                method: 'DELETE',
              });
            if (!response.ok) {
                console.error("Deletion Failed")
            } else {
                setSales(sales.filter(sale => sale.id !== id));
            }

        } catch (error) {
            console.error("Another fail", error)
        }
    }


    return (
        <>
        <div>
            <select onChange={handleSalespersonChange} value={searchedSalesperson} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a Salesperson</option>
                {salespeople.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                    );
                 })}
            </select>
        </div>
        <table className={tableClasses}>
        <thead>
            <tr>

            <th>Automobile</th>
            <th>Price</th>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {sales.map(sale => {
            return (
                <tr key={sale.id}>
                    <td>{ sale.automobile.vin }</td>
                    <td>{ sale.price }</td>
                    <td>{ sale.salesperson.first_name } {sale.salesperson.last_name}</td>
                    <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                    <td><button onClick={deleteSale(sale.id)}>Delete</button></td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>

    );
    }
    export default SalesList;
