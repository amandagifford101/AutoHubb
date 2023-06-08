import React from "react";

function AppointmentList(props){

    const scheduledAppts = props.appointments.filter(appointment => appointment.status === "scheduled")

    function isVip(vin) {
        let sold = []
        for (const automobile of props.automobiles) {
            if (vin === automobile.vin) {
                sold.push(vin)
            }
        }
        if (sold.length > 0 ){
            return "Yes"
        }
        else {
            return "No"
        }
    }

    function getDate(datetime) {
        const date = new Date(datetime);
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();
        const fullDate = (month+1) + "/" + day + "/" + year;
        return fullDate
    }

    function getTime(datetime) {
        const date = new Date(datetime);
        const timestamp = date.getTime();
        const convertTime = new Date(timestamp)
        const time = convertTime.toLocaleTimeString("en-US")
        return time
    }

    const cancelAppointment = async(appointment) => {
        try{
            const canceled = appointment.id;
            const apptUrl = `http://localhost:8080/api/appointments/${canceled}/cancel`;
            const fetchConfig = {
                method: "put",
            };
            const response = await fetch(apptUrl, fetchConfig);
            if (response.ok) {
                console.log("appointment canceled")
                props.getAppointments()
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const finishAppointment = async(appointment) => {
        try{
            const finished = appointment.id;
            const apptUrl = `http://localhost:8080/api/appointments/${finished}/finish`;
            const fetchConfig = {
                method: "put",
            };
            const response = await fetch(apptUrl, fetchConfig);
            if (response.ok) {
                console.log("appointment finished")
                props.getAppointments()
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
        <h1>Scheduled Appointments</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {scheduledAppts.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ isVip(appointment.vin) }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ getDate(appointment.date_time) }</td>
                            <td>{ getTime(appointment.date_time) }</td>
                            <td>{ appointment.technician.first_name } {appointment.technician.last_name}</td>
                            <td>{ appointment.reason }</td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={() => cancelAppointment(appointment)}>Cancel</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-success" onClick={() => finishAppointment(appointment)}>Finish</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}

export default AppointmentList