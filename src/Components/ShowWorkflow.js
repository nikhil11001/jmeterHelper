import React from 'react'

function ShowWorkflow(props) {
  return (
    <div className=''>
    <h2>Add APIs</h2>
    <table className="table border">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Api Name</th>
            <th scope="col">Api Path</th>
            <th scope="col">HTTP Method</th>
            {/* <th scope='col'>Request Body</th> */}
            <th scope='col'>Actions</th>
            </tr>
        </thead>
        <tbody>
        {props.apiList && props.apiList.length > 0 &&
        props.apiList.map((api, index) => {
            return (
            <tr key={`${api.apiName} ${api.apiPath}`}>
                <th scope="row">{index+1}</th>
                <td>{api.apiName}</td>
                <td>{api.apiPath}</td>
                <td>{api.httpMethod}</td>
                {/* <td>{api.requestBody}</td> */}
                <td><button type="button" className="btn btn-dark me-2" onClick={() => props.editApi(index)}>Edit</button>
                <button type="button" className="btn btn-dark" onClick={() => props.deleteApi(index)}>Delete</button></td>
            </tr>  );   
        })}
        </tbody>
    </table>
    </div>
  )
}

export default ShowWorkflow