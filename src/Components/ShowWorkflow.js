import React from "react";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ShowWorkflow(props) {
  return (
    <div className="">
      <h2>Add APIs</h2>
      <table className="table border">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Api Name</th>
            <th scope="col">Api Path</th>
            <th scope="col">HTTP Method</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.apiList &&
            props.apiList.length > 0 &&
            props.apiList.map((api, index) => {
              return (
                <tr key={`${api.apiName} ${api.apiPath}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{api.apiName}</td>
                  <td>{api.apiPath}</td>
                  <td>{api.httpMethod}</td>
                  <td>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => props.editApi(index)}
                      color="success"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon
                        fontSize="inherit"
                        onClick={() => props.deleteApi(index)}
                        color="error"
                      />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowWorkflow;
