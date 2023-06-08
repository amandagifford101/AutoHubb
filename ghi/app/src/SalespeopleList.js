import React, { useState, useEffect } from 'react';

function SalespeopleList(props) {
    // const [hasDeleted, setHasDeleted] = useState([false]);
    let tableClasses = 'table table-striped table-hover';

    const [ salespeople, setSalespeople ] = useState([]);

    async function getSalespeople() {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salesperson)
        }
    }

    useEffect(() => {
        getSalespeople();
    })

    const deleteSalesperson = (id) => async () => {

        try {
            const response = await fetch(`http://localhost:8090/api/salesperson/${id}/delete/`, {
                method: 'DELETE',
              });
            if (!response.ok) {
                console.error("Deletion Failed")
            } else {
                setSalespeople(salespeople.filter(salesperson => salesperson.id !== id));
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
            <th>Employee Id</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {salespeople.map(salesP => {
            return (
                <tr key={salesP.id}>
                <td>{ salesP.first_name }</td>
                <td>{ salesP.last_name }</td>
                <td>{ salesP.employee_id }</td>
                <td><button onClick={deleteSalesperson(salesP.id)}>Delete</button></td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>

    );
    }
    export default SalespeopleList;
