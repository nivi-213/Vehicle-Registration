
import React from "react";
import {useSelector} from 'react-redux';
// import { Link } from 'react-router-dom';

const Navbar = () => {

  const {tasksList,error} = useSelector((state) => state.tasks)

  return (
    <>
      <h1 className="text-center my-4 text-primary">Project Management</h1>
      <p className="text-center lead">{`Currently ${tasksList.length} task(s) pending`}</p>
      {
        (error !== '') ? <h5 className="text-center text-danger">{error}</h5> : null
      }
        {/* <nav>
      <ul>
        <li>
          <Link to="/">Home</Link> 
        </li>
        <li>
          <Link to="/task-list">Task List</Link>
        </li>
      </ul>
    </nav> */}
    </>
  );
};

export default Navbar;