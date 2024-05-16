import "./App.css";
import Navbar from "./component/Navbar";
import AddTask from "./component/AddTask";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./component/TaskList";
import Home from "./component/Home";
import MyVerticallyCenteredModal from "./component/UpdateTask";

function App() {
  return (
    <>
   
      <BrowserRouter>
      <Navbar />
    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<AddTask />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/list" element={<MyVerticallyCenteredModal />} />
          </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
