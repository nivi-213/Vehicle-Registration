import "./App.css";
import Navbar from "./component/Navbar";
import AddTask from "./component/AddTask";
import Container from "../node_modules/react-bootstrap/esm/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Row, Col } from "react-bootstrap";
import TaskList from "./component/TaskList";
function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddTask />} />
          <Route path="/task-list" element={<TaskList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
