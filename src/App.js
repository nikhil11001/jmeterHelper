import './App.css';
import Navbar from './Components/Navbar';
import Workflow from './Components/Workflow';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Response from './Components/Response';



function App() {


  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Workflow />}></Route>
            <Route path="/apiResponse" element={<Response />}></Route>
            {/* <Route path="/apiResp" element={<Response />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;
