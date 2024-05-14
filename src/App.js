import "./App.css";
import Navbar from "./component/Navbar";
import AddTask from "./component/AddTask";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Row, Col } from "react-bootstrap";
import TaskList from "./component/TaskList";
import Home from "./component/Home";
import MyVerticallyCenteredModal from "./component/UpdateTask";
function App() {
  return (
    <Router>
      <Navbar />
      {/* <Container> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<AddTask />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/list" element={<MyVerticallyCenteredModal />} />
      </Routes>
      {/* </Container> */}
    </Router>
  );
}

export default App;
