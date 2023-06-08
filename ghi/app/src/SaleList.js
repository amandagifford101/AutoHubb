import React, { useState, useEffect } from 'react';

function SalesList(props) {
    // const [hasDeleted, setHasDeleted] = useState([false]);
    let tableClasses = 'table table-striped table-hover';

    const [ sales, setSales ] = useState([]);

    async function getSales() {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        }
    }

    useEffect(() => {
        getSales();
    })

    return (
        <>
        <table className={tableClasses}>
        <thead>
            <tr>

            <th>Automobile</th>
            <th>Price</th>
            <th>Salesperson</th>
            <th>Customer</th>
            </tr>
        </thead>
        <tbody>
            {sales.map(sale => {
            return (
                <tr key={sale.automobile.vin}>
                    <td>{ sale.automobile.vin }</td>
                    <td>{ sale.price }</td>
                    <td>{ sale.salesperson.first_name } {sale.salesperson.last_name}</td>
                    <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>

    );
    }
    export default SalesList;
