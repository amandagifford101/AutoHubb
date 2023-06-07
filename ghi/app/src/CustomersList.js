import React, { useState, useEffect } from 'react';

function CustomersList(props) {
    // const [hasDeleted, setHasDeleted] = useState([false]);
    let tableClasses = 'table table-striped table-hover';

    const [ customers, setCustomers ] = useState([]);

    async function getCustomers() {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        }
    }

    useEffect(() => {
        getCustomers();
    })

    return (
        <>
        <table className={tableClasses}>
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            </tr>
        </thead>
        <tbody>
            {customers.map(customer => {
            return (
                <tr key={customer.phone_number}>
                <td>{ customer.first_name }</td>
                <td>{ customer.last_name }</td>
                <td>{ customer.address }</td>
                <td>{ customer.phone_number }</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>

    );
    }
    export default CustomersList;
