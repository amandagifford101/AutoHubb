import React from "react";

function TechnicianList(props) {
    const deleteTechnician = async(technician) => {
        try{
            const deleted = technician.id
            const technicianUrl = `http://localhost:8080/api/technicians/${deleted}/`;
            const fetchConfig = {
                method: "delete",
            };
            const response = await fetch(technicianUrl, fetchConfig);
            if (response.ok) {
                console.log("technician deleted")
                props.getTechnicians()
            };
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {props.technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{ technician.employee_id }</td>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
                            <td>
                                <button onClick={() => deleteTechnician(technician)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}

export default TechnicianList