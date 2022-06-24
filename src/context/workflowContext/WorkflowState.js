import { useState } from 'react';
import WorkflowRespContext from './workflowRespContext';

const WorkflowState = (props) => {
    const [apiList, setApiList] = useState([]);
    const [apiResp, setApiResp] = useState([]);
    const [workflowName, setWorkflowName] = useState("");
    // const showAlert = (type, message) => {
    //     const newObj = {...alert}
    //     newObj.show = true;
    //     newObj.type = type;
    //     newObj.message = message;
    //     setAlert(newObj);  
    //     setTimeout(setAlert, 2000, {
    //         show: false,
    //         type: '',
    //         message: ''
    //     });
    // }
    return (
        <WorkflowRespContext.Provider value={{apiList, setApiList, apiResp, setApiResp, workflowName, setWorkflowName}}>
            {props.children}
        </WorkflowRespContext.Provider>
    )
}

export default WorkflowState