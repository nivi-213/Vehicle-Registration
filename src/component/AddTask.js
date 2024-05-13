import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../Slice/taskThunk";
import { useDispatch } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // State variables
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Function to add task
  const addTask = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    // Basic form validation
    const errors = {};
    if (!name.trim()) {
      errors.name = "Please enter your first name.";
    }
    if (!lastname.trim()) {
      errors.lastname = "Please enter your last name.";
    }
    if (!email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) {
      errors.phone = "Please enter your phone number.";
    }
    if (!date.trim()) {
      errors.date = "Please enter your date of birth.";
    }
    if (!address.trim()) {
      errors.address = "Please enter your address.";
    }
    if (!gender) {
      errors.gender = "Please select your gender.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false); // Set isLoading to false here if there are errors
      return;
    }

    try {
      // If no errors, dispatch the action and navigate
      await dispatch(addTaskToServer({ name, lastname, email, phone, date, address, gender }));
      // Clear form fields after submission
      setName("");
      setLastname("");
      setEmail("");
      setPhone("");
      setDate("");
      setAddress("");
      setGender("");
      // Clear form errors
      setFormErrors({});
      // Navigate to task list page
      navigate("/task-list");
    } catch (error) {
      console.error("Error adding task:", error);
      setIsLoading(false); // Set isLoading to false if there's an error
    }
  };

  return (
    <section className="my-5 mt-5">
      <Form className="container p-4 mx-auto">
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label className="fw-bold">First Name:</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter First Name"
                value={name}
                className="p-3"
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label className="fw-bold">Last Name:</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter Last Name"
                value={lastname}
                className="p-3"
                onChange={(e) => setLastname(e.target.value)}
                isInvalid={!!formErrors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastname}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-bold">Email:</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                placeholder="Enter Email"
                value={email}
                className="p-3"
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formDateOfBirth">
              <Form.Label className="fw-bold">Date of Birth:</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                placeholder="Enter Date of Birth"
                className="p-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                isInvalid={!!formErrors.date}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.date}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label className="fw-bold">Phone Number:</Form.Label>
              <Form.Control
                size="sm"
                type="tel"
                className="p-3"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={!!formErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label className="fw-bold">Gender:</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                value={gender}
                className="p-3"
                onChange={(e) => setGender(e.target.value)}
                isInvalid={!!formErrors.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.gender}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label className="fw-bold">Address:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Address"
                value={address}
                className="p-3"
                onChange={(e) => setAddress(e.target.value)}
                isInvalid={!!formErrors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="text-center mt-4">
          {/* Conditionally render the spinner if isLoading is true */}
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            // Render the submit button if not loading
            <Button variant="primary" type="submit" onClick={addTask}>
              Add Task
            </Button>
          )}
        </div>
      </Form>
    </section>
  );
};

export default AddTask;
