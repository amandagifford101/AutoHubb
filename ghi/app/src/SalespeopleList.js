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

    return (
        <>
        <table className={tableClasses}>
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee Id</th>
            </tr>
        </thead>
        <tbody>
            {salespeople.map(salesP => {
            return (
                <tr key={salesP.employee_id}>
                <td>{ salesP.first_name }</td>
                <td>{ salesP.last_name }</td>
                <td>{ salesP.employee_id }</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>

    );
    }
    export default SalespeopleList;
