import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../Slice/taskslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    console.log({ title, description });
    dispatch(addTaskToServer({ title, description }));
    setTitle("");
    setDescription("");
    navigate("/task-list");
  };

  return (
    <section className="my-5">
      <Form className="container p-4 mx-auto">
        <Form.Group className="text-center" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Task Title:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            className="w-50 mx-auto"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="text-center" controlId="formBasicPassword">
          <Form.Label className="fw-bold">Task Description:</Form.Label>
          <Form.Control
            size="sm"
            className="w-50 mx-auto mb-3"
            type="text"
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" onClick={addTask}>
            Add Task
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AddTask;
