import "./App.css";
import Navbar from "./component/Navbar";
import AddTask from "./component/AddTask";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./component/TaskList";
// import Home from "./component/Home";
import MyVerticallyCenteredModal from "./component/UpdateTask";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
   
      <BrowserRouter>
      <Navbar />
    
          <Routes>
            <Route path="/" element={<Navigate to={'/vehicle-registration'}/>} />
            <Route path="/vehicle-registration" element={<AddTask />} />
            <Route path="/vehicle-view" element={<TaskList />} />
            <Route path="/vehicle-update" element={<MyVerticallyCenteredModal />} />
          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
