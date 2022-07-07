import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import workflowContext from '../context/workflowContext/workflowRespContext';

function Response() {
    let navigate = useNavigate();
  const context = useContext(workflowContext);
  const { apiList, setApiList, apiResp, setApiResp, workflowName, setWorkflowName} = context;
  // const [apiResponse, setApiResponse] = useState(apiResp)
  const [showRespButton, setShowRespButton] = useState([]);

  function redirectToHome () {
    setApiResp([]);
    navigate("/");
  }

  function redirectToNewRequest () {
    setApiList([]);
    setWorkflowName("");
    redirectToHome();
  }

  useEffect(() => {
    const show = new Array(apiResp.length).fill(true);
    setShowRespButton(show)
  }, [apiResp])

  function setShowResp (ind) {
    const showArr = showRespButton.slice();
    showArr[ind] = !showArr[ind];
    setShowRespButton(showArr)
  }
  useEffect (() => {

  }, [apiResp])
  return (
    <div className='container my-5'>
        <div className='d-flex justify-content-between'>
            <h2>Workflow Result for {workflowName}</h2>
            <div>
                <button className='btn btn btn-info mx-2' onClick={redirectToHome}>Edit Workflow</button>
                <button className='btn btn btn-info' onClick={redirectToNewRequest}>New Workflow</button>
            </div>
        </div>
        <table className="table border">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Api Name</th>
                <th scope="col">Response Status</th>
                <th scope="col">Response Data</th>
                </tr>
            </thead>
            <tbody>
            {/* && apiList && apiList.length > 0 */}
            {apiResp && apiResp.length > 0 &&
            apiResp.map((resp,ind) => {
                return (
                <tr key={`${Math.random(ind)}`}>
                    <th scope="row">{ind+1}</th>
                    <td>{resp.apiName}</td>
                    <td>{resp.apiStat}</td>
                
                    <td><button className='btn btn btn-info' onClick={() => setShowResp(ind)}>
                        {showRespButton[ind] ? "Show Resp" : "Hide Resp"}</button>
                        {showRespButton[ind] ? "" : <div>{JSON.stringify(resp.resp)}</div>}</td>
                </tr>  );   
            })}
            </tbody>
        </table>
    </div>
  )
}

export default Response