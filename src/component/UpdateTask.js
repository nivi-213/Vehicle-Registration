// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { updateTaskFromList } from "../Slice/taskslice";

// const MyVerticalCenteredModal = (props) => {
//   // State management
//   const {selectedTask} = useSelector((state) => state.task);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [id, setId] = useState(0);
//   const dispatch = useDispatch();

//   // Function to update task
//   const updateTask = () => {
//     props.onHide(); // Close modal
//     dispatch(updateTaskFromList({ id, title, description })); // Dispatch action to update task
//   };

//   // Effect to update state when selected task changes
//   // useEffect(() => {
//   //   if ( Object.keys(selectedTask).length !== 0) {
//   //     setTitle(selectedTask.title);
//   //     setDescription(selectedTask.description);
//   //     setId(selectedTask.id);
//   //   }
//   // }, [selectedTask]);
//   useEffect(() => {
//     if (Object.keys(selectedTask).length !== 0) {
//       setTitle(selectedTask.title);
//       setDescription(selectedTask.description);
//       setId(selectedTask.id);
//     }
//   }, [selectedTask]);
//   // JSX
//   return (
//     <>
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Modal Heading
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="form-group">
//               <label htmlFor="exampleInputEmail1">Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter email"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleInputPassword1">Task Description</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter Description"
//               />
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <div className="text-end">
//             <button
//               type="button"
//               onClick={(e) => updateTask(e)}
//               className="btn btn-primary mt-3"
//             >
//               Update Task
//             </button>
//           </div>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default MyVerticalCenteredModal;
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { updateTaskInServer } from "../Slice/taskslice";
import {useDispatch} from 'react-redux';

const MyVerticalCenteredModal = (props) => {
  const { selectedTask } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const dispatch = useDispatch()

  const updateTask = () => {
    props.onHide();
    dispatch(updateTaskInServer({id,title,description}))
  };

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setId(selectedTask.id);
    }
  }, [selectedTask]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => updateTask(e)}
          >
            Update Task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticalCenteredModal;