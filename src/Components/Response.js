import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Response({ apiResp, apiList, workflowName }) {
  let navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <h2>Workflow Result for {workflowName}</h2>
        <div>
          <Button variant="contained" onClick={() => navigate("/")}>
            Edit Workflow
          </Button>
        </div>
      </div>
      <table className="table border">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Api Name</th>
            <th scope="col">Response</th>
          </tr>
        </thead>
        <tbody>
          {apiResp &&
            apiResp.length > 0 &&
            apiList &&
            apiList.length > 0 &&
            apiResp.map((resp, ind) => {
              return (
                <tr key={`${Math.random(ind)}`}>
                  <th scope="row">{ind + 1}</th>
                  <td>{apiList[ind].apiName}</td>
                  <td>
                    <textarea rows="4" cols="50">
                      {JSON.stringify(resp)}
                    </textarea>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Response;
