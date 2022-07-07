import { useState } from 'react';
import WorkflowRespContext from './workflowRespContext';

const WorkflowState = (props) => {
    const [apiList, setApiList] = useState([]);
    const [apiResp, setApiResp] = useState([]);
    const [workflowName, setWorkflowName] = useState("");

    return (
        <WorkflowRespContext.Provider 
            value={{apiList, setApiList, apiResp, setApiResp, workflowName, setWorkflowName}}>
            {props.children}
        </WorkflowRespContext.Provider>
    )
}

export default WorkflowState