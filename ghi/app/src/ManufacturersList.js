import React from 'react';

function ManufacturersList(props) {
    let tableClasses = 'table table-striped table-hover';

    return (
        <>
        <table className={tableClasses}>
          <thead>
            <tr>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {props.manufacturers.map(manufacturer => {
              return (
                <tr key={manufacturer.id}>
                  <td>{ manufacturer.name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {hasDeleted && (
            <div className={messageClasses} id="success-message">
            The shoes have been deleted!
        </div>
        )} */}
    </>

    );
}

export default ManufacturersList;
