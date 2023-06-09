import React, { useState, useEffect } from 'react';

function CustomersList(props) {

    let tableClasses = 'table table-striped table-hover';

    const deleteCustomer = (id) => async () => {

        try {
            const response = await fetch(`http://localhost:8090/api/customer/${id}/delete/`, {
                method: 'DELETE',
              });
            if (!response.ok) {
                console.error("Deletion Failed")
            } else {
                props.getCustomers();
            }

        } catch (error) {
            console.error("Another fail", error)
        }
    }


    return (
        <>
        <table className={tableClasses}>
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {props.customers.map(customer => {
            return (
                <tr key={customer.id}>
                <td>{ customer.first_name }</td>
                <td>{ customer.last_name }</td>
                <td>{ customer.address }</td>
                <td>{ customer.phone_number }</td>
                <td><button onClick={deleteCustomer(customer.id)}>Delete</button></td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>

    );
    }
    export default CustomersList;
