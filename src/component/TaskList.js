// import React, { useState, useEffect } from "react";
// import { Button, Spinner } from "react-bootstrap";
// import Table from "react-bootstrap/Table";

// import { useSelector, useDispatch } from "react-redux";
// import { getTasksFromServer, deleteTaskFromServer } from "../Slice/taskThunk";
// import { removeTaskFromList, setSelectedTask } from "../Slice/taskslice";
// import { useNavigate } from "react-router-dom";

// const TaskList = () => {
//   const { tasksList } = useSelector((state) => state.tasks);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const updateTask = async (task) => {
//     setLoading(true);
//     try {
//       // Assuming setSelectedTask sends a request to update the task on the server
//       await dispatch(setSelectedTask(task));
//       // Assuming getTasksFromServer fetches the updated list of tasks
//       await dispatch(getTasksFromServer());
//       navigate("/list");
//     } catch (error) {
//       console.error("Error updating task:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     dispatch(getTasksFromServer());
//   }, [dispatch]);

//   const deleteTask = async (task) => {
//     setLoading(true);
//     try {
//       await dispatch(deleteTaskFromServer(task)).unwrap();
//       dispatch(removeTaskFromList(task));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="table-responsive">
//       {loading && (
//         <div className="text-center mt-3">
//           <Spinner animation="border" role="status">
//             <span className="sr-only">...</span>
//           </Spinner>
//         </div>
//       )}
//       {tasksList && tasksList.length > 0 ? (
//         <Table striped bordered hover className="mt-5 container">
//           <thead>
//             <tr className="text-center">
//               <th># S.No</th>
//               <th>First Name</th>
//               <th>Vehicle Modal</th>
//               <th>Vehicle Identification Number</th>
//               <th>Phone</th>
//               <th>Year</th>
//               <th>Color</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasksList.map((task, index) => (
//               <tr className="text-center" key={task.id}>
//                 <td>{index + 1}</td>
//                 <td>{task.name}</td>
//                 <td>{task.modal}</td>
//                 <td>{task.vin}</td>
//                 <td>{task.phone}</td>
//                 <td>{task.year}</td>
//                 <td>{task.color}</td>
//                 <td>{task.address}</td>
//                 <td>
//                   <Button
//                     variant="success"
//                     className="mx-3"
//                     onClick={() => updateTask(task)}
//                   >
//                     <i className="bi bi-pencil-square"></i>
//                   </Button>
//                   <Button variant="danger" onClick={() => deleteTask(task)}>
//                     <i className="bi bi-trash3"></i>
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No tasks available</p>
//       )}
//     </div>
//   );
// };

// export default TaskList;
import React, { useState, useEffect } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import { useSelector, useDispatch } from "react-redux";
import { getTasksFromServer, deleteTaskFromServer } from "../Slice/taskThunk";
import { removeTaskFromList, setSelectedTask } from "../Slice/taskslice";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [taskToDelete, setTaskToDelete] = useState(null); // State to store the task to be deleted

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateTask = async (task) => {
    setLoading(true);
    try {
      // Assuming setSelectedTask sends a request to update the task on the server
      await dispatch(setSelectedTask(task));
      // Assuming getTasksFromServer fetches the updated list of tasks
      await dispatch(getTasksFromServer());
      navigate("/list");
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  const handleDelete = async () => {
    if (taskToDelete) {
      setLoading(true);
      try {
        await dispatch(deleteTaskFromServer(taskToDelete)).unwrap();
        dispatch(removeTaskFromList(taskToDelete));
        setShowDeleteModal(false); // Hide modal after deletion
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleShowModal = (task) => {
    setShowDeleteModal(true);
    setTaskToDelete(task);
  };

  return (
    <div className="table-responsive">
      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="sr-only">...</span>
          </Spinner>
        </div>
      )}
      {tasksList && tasksList.length > 0 ? (
        <Table striped bordered hover className="mt-5 container">
          <thead>
            <tr className="text-center">
              <th># S.No</th>
              <th>First Name</th>
              <th>Vehicle Modal</th>
              <th>Vehicle Identification Number</th>
              <th>Phone</th>
              <th>Year</th>
              <th>Color</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasksList.map((task, index) => (
              <tr className="text-center" key={task.id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.modal}</td>
                <td>{task.vin}</td>
                <td>{task.phone}</td>
                <td>{task.year}</td>
                <td>{task.color}</td>
                <td>{task.address}</td>
                <td>
                  <Button
                    variant="success"
                    className="mx-3"
                    onClick={() => updateTask(task)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal(task)} // Show delete confirmation modal
                  >
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No tasks available</p>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
