import './App.css';
import {useContext} from 'react'; 
import Navbar from './Components/Navbar';
import Workflow from './Components/Workflow';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Response from './Components/Response';
import workflowContext from './context/workflowContext/workflowRespContext';



function App() {

  const context = useContext(workflowContext);
  const { apiList, apiResp, workflowName} = context;

  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Workflow />}></Route>
            <Route path="/apiResp" element={
              <Response
                apiResp={apiResp}
                apiList={apiList}
                workflowName={workflowName} />
            }></Route>
            {/* <Route path="/apiResp" element={<Response />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;
