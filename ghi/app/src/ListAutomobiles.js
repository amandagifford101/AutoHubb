import React, { useState } from "react";

function AutomobileList(props){

    function yesNo(boolean) {
        if (boolean === true) {
            return "Yes"
        }
        else {
            return "No"
        }
    }

    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {props.automobiles.map(automobile => {
                    return (
                        <tr key={automobile.vin}>
                            <td>{ automobile.vin }</td>
                            <td>{ automobile.color }</td>
                            <td>{ automobile.year }</td>
                            <td>{ automobile.model.name }</td>
                            <td>{ automobile.model.manufacturer.id }</td>
                            <td>{ yesNo(automobile.sold.toString()) }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}

export default AutomobileList