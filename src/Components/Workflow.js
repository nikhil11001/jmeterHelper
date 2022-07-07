import React, {useState, useEffect, useContext} from 'react'
import ShowWorkflow from './ShowWorkflow';
import axios from 'axios';
import api from './MockAPI/apiAll';
import workflowContext from '../context/workflowContext/workflowRespContext'
import AutoComplete from './Utilities/Autocomplete/AutoComplete';
import {
    useNavigate
  } from "react-router-dom";

function Workflow() {
    const [addApiBox, setAddApiBox] = useState(false);
    const [editBox, setEditBox] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const context = useContext(workflowContext);
    const { apiList, setApiList, apiResp, setApiResp, workflowName, setWorkflowName } = context;

    const [apiAll, setApiAll] = useState([]);


    const [apiName, setApiName] = useState("");
    const [apiPath, setApiPath] = useState("");
    const [httpMethod, setHttpMethod] = useState("");
    const [requestBody, setRequestBody] = useState("");
    const [apiAllNames, setApiAllNames] = useState([])
    // let apiAllNames = apiAll.map(item => item.apiName)

    let navigate = useNavigate();
    
    useEffect(function reload () {
        // Mocking Resp
        setApiAll([...api]);
        setApiAllNames([...api].map(item => item.apiName))
    }, []);

    function showApiInputBox (switchBox) {
        if (switchBox === true) {
            setApiName("");
            setApiPath("");
            setHttpMethod("");
            setRequestBody("");        
        }
        setAddApiBox(switchBox);
        setEditBox(false);
    }

    function disableAdd() {
        if ((apiName && apiName.length > 0) && (apiPath && apiPath.length > 0) &&
            (httpMethod && httpMethod.length > 0)) {
                return false;
        }
        return true;
    } 

    function disableWorkflow() {
        if (workflowName && apiList && apiList.length > 0) {
            return false;
        }
        return true;
    }

    function autoCompleteApi (val) {
        setApiName(val);
        let selectedApiIndex = apiAllNames.findIndex(item => item === val)
        if (selectedApiIndex !== -1) {
            setApiPath(apiAll[selectedApiIndex].apiPath);
            setHttpMethod(apiAll[selectedApiIndex].httpMethod);
            setRequestBody(apiAll[selectedApiIndex].requestBody);
        } else {
            setApiPath("");
            setHttpMethod("");
            setRequestBody("");        
        }
    }

    function addApi () {
        const apiObj = {
            "apiName": apiName,
            "apiPath": apiPath,
            "httpMethod": httpMethod,
            "requestBody": requestBody
        };
        if (editBox) {
            const newApiList = apiList.slice();
            newApiList[editIndex] = apiObj;
            setApiList(newApiList);
        } else {
            setApiList([...apiList, apiObj])
        }
        
        setApiName("");
        setApiPath("");
        setHttpMethod("");
        setRequestBody("");

        setApiResp([]);
        showApiInputBox(false);
    }

    function deleteApi (index) {
        setApiList(apiList.filter((_, ind) => (ind !== index)))
    }

    function editApi (index) {
        showApiInputBox(true);
        setEditIndex(index);
        apiList.forEach((item, ind) => {
            if (ind === index) {
                setApiName(item.apiName);
                setApiPath(item.apiPath);
                setHttpMethod(item.httpMethod);
                setRequestBody(item.requestBody);         
            }
        })
        setEditBox(true);
    }

    // const mapLoop = async _ => {
    //     console.log('Start')
      
    //     const promises = fruitsToGet.map(async fruit => {
    //       const numFruit = await getNumFruit(fruit)
    //       return numFruit
    //     })
      
    //     const numFruits = await Promise.all(promises)
    //     console.log(numFruits)
      
    //     console.log('End')
    //   }

    async function callApi () {
        let apiResponse = [];

        const promises = apiList.map(async api => {
            switch (api.httpMethod) {
                case "GET":
                    await axios
                        .get(api.apiPath)
                        .then((response) => {
                            setResponseReceived(apiResponse, response, api);
                        })
                        .catch(error => {
                            if (error.response) {
                                setResponseReceived(apiResponse, error.response, api)
                            }
                        });
                    break;
                case "POST":
                    await axios
                        .post(api.apiPath, api.requestBody)
                        .then((response) => {
                            setResponseReceived(apiResponse, response, api);
                        })
                        .catch(error => {
                            if (error.response) {
                                setResponseReceived(apiResponse, error.response, api)
                            }
                        });
                    break;
                case "PUT":
                    await axios
                        .put(api.apiPath, api.requestBody)
                        .then((response) => {
                            setResponseReceived(apiResponse, response, api);
                        })
                        .catch(error => {
                            if (error.response) {
                                setResponseReceived(apiResponse, error.response, api)
                            }
                        });
                    break;
                case "DELETE":
                    await axios
                        .delete(api.apiPath)
                        .then((response) => {
                            console.log(response.data);
                            setResponseReceived(apiResponse, response, api);
                        })                        
                        .catch(error => {
                            if (error.response) {
                                setResponseReceived(apiResponse, error.response, api)
                            }
                        });
                    break;
                default:
                    break;
            }
        })

        await Promise.all(promises);
        await navigate("/apiResponse");
    }
    function setResponseReceived (apiResponse, respReceived, api) {

        const apiObj = {
            "apiName" : api["apiName"],
            "apiStat" : respReceived.status,
            "resp": null
        }
        if (respReceived.data && respReceived.data.length > 0) {
            apiObj.resp = [...respReceived.data]
        } else if (respReceived // 👈 null and undefined check
            && Object.keys(respReceived).length === 0
            && Object.getPrototypeOf(respReceived) === Object.prototype) {
            apiObj.resp = [{resp: "Resp not available"}]
        } else if (respReceived.data === undefined || respReceived.data === null) {
            apiObj.resp = [{resp: "Resp not available"}]
        } else {
            apiObj.resp = [respReceived.data]
        }
        apiResponse.push(apiObj)
        setApiResp(...apiResp, apiResponse);
    }
// console.log(apiName, apiPath, httpMethod, requestBody);

  return (
    <>  

        <form className='mb-2'>
        <h1>Create Workflow</h1>
        <div className="mb-3">
            <label htmlFor="workflowName" className="form-label">Workflow Name</label>
            <input type="text" className="form-control" id="workflowName" value={workflowName} onChange={e => setWorkflowName(e.target.value)} />
        </div>
        <button type="button" className="btn btn-info mb-4" onClick={() => showApiInputBox(true)}>+Add Api</button>
        <div className={`shadow p-3 mb-5 bg-body rounded border ${addApiBox ? "d-block" : "d-none"}`}>
            <div className="mb-3 dropdown">
                <label htmlFor="apiName" className="form-label">Api Name</label>
                {/* <input type="text" className="form-control" list=''  id="apiName"  
                value={apiName}  /> */}
                <AutoComplete
                    suggestions={apiAllNames}
                    autoClass="form-control"
                    autoCompleteApi={autoCompleteApi}
                    autoCompleteId="apiName" 
                    inputVal={apiName}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="apiPath" className="form-label">Api Path</label>
                <input type="text" className="form-control" id="apiPath" 
                value={apiPath} onChange={e => setApiPath(e.target.value)}/>
            </div>
            <div className="mb-3">
                <select value={httpMethod} onChange={e => setHttpMethod(e.target.value)}>
                    <option value="">Select HTTP Method</option>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Add request body" value={requestBody}
                id="floatingTextarea2" onChange={e => setRequestBody(e.target.value)} style={{height: "100px"}}></textarea>
                <label htmlFor="floatingTextarea2">Request Body</label>
            </div>
            <div className="mb-3">
                <button type="button" className="btn btn-dark me-3" onClick={addApi} disabled={disableAdd()}>{editBox ?"Edit" : "Add"}</button>
                <button type="button" className="btn btn-dark" onClick={() => showApiInputBox(false)}>Cancel</button>
            </div>
        </div>
        </form>

        {apiList && apiList.length > 0 ?
            <>
                <ShowWorkflow
                    apiList={apiList}
                    deleteApi={deleteApi}
                    editApi={editApi} /> 
                <div className="mb-3">
                    <button type="button" className="btn btn-dark me-3" onClick={callApi} disabled={disableWorkflow()}>Create Workflow</button>
                    <button type="button" className="btn btn-dark" onClick={() => setApiList([])}>Cancel</button>
                </div>
            </>
        : <div className="form-label">No Workflow Exists</div>}  

    </>)
}

export default Workflow         