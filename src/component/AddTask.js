import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../Slice/taskThunk";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [modal, setModal] = useState("");
  const [color, setColor] = useState("");
  const [vin, setVin] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});


  // Function to reset form errors
  const resetFormErrors = () => {
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setName(value);
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            name: "Please enter your first name.",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            name: "",
          }));
        }
        break;
      case "modal":
        setModal(value);
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            modal: "Please enter your modal.",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            modal: "",
          }));
        }
        break;
      case "vin":
        setVin(value);
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            vin: "Please enter your vehicle identification number.",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            vin: "",
          }));
        }
        break;
      case "phone":
        const phoneRegex = /^(?!(0{10}))[0-9]{10}$/;
        const isValidPhone = phoneRegex.test(value);
        setPhone(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          phone: isValidPhone
            ? ""
            : "Please enter a valid 10-digit phone number.",
        }));
        break;
      case "year":
        setYear(value);
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            year: "Please enter your year .",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            year: "",
          }));
        }
        break;
      case "address":
        setAddress(value);
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            address: "Please enter your address.",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            address: "",
          }));
        }
        break;
      case "color":
        setColor(value);
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            color,
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            color: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = {};
    
    if (!name.trim()) {
      errors.name = "Please enter your first name.";
    }
    if (!modal.trim()) {
      errors.modal = "Please enter your modal.";
    }
    if (!vin.trim()) {
      errors.vin = "Please enter your vehicle identification number.";
    }
    if (!phone.trim()) {
      errors.phone = "Please enter your phone number.";
    }
    if (!year.trim()) {
      errors.year = "Please enter your year.";
    }
    if (!address.trim()) {
      errors.address = "Please enter your address.";
    }
    if (!color) {
      errors.color = "Please select your color.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(
        addTaskToServer({ name, modal, vin, phone, year, address, color })
      );
      // Clear form fields after successful submission
      setName("");
      setModal("");
      setVin("");
      setPhone("");
      setYear("");
      setAddress("");
      setColor("");
      resetFormErrors(); // Reset form errors
      setIsLoading(false);
      navigate("/task-list");
    } catch (error) {
      console.error("Error adding task:", error);
      setIsLoading(false);
    }
  
  
  };
  const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
  return (
    <section className="my-5 mt-5">
       <h1 className="text-center ">Form Vehicle </h1>
      <Form className="container p-4 mx-auto">
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label className="fw-bold">
                First Name<span className="text-danger">*:</span>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter First Name"
                value={name}
                className="p-3"
                onChange={handleChange}
                name="firstName"
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formModal">
              <Form.Label className="fw-bold">
                Vehicle make<span className="text-danger">*:</span>
              </Form.Label>
              <Form.Control
                size="sm"
                as="select"
                value={modal}
                className="p-3"
                onChange={handleChange}
                name="modal"
                isInvalid={!!formErrors.modal}
              >
                <option value="">Select Modal</option>{" "}
                {/* Add the optional selection */}
                {/* Add other options dynamically if needed */}
                <option value="Yamaha"> Yamaha</option>
                <option value=" Royal Enfield">Royal Enfield </option>
                <option value="Suzuki ">Suzuki </option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.modal}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-bold">
                Vehicle Identification Number
                <span className="text-danger">*:</span>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter Identification Number"
                value={vin}
                className="p-3"
                onChange={handleChange}
                name="vin"
                isInvalid={!!formErrors.vin}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.vin}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formYear">
          <Form.Label className="fw-bold">
            Year<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            as="select"
            size="sm"
            className="p-3"
            value={year}
            onChange={handleChange}
            name="year"
            isInvalid={!!formErrors.year}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {formErrors.year}
          </Form.Control.Feedback>
        </Form.Group>

          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label className="fw-bold">
                Phone Number<span className="text-danger">*:</span>
              </Form.Label>
              <Form.Control
                size="sm"
                type="tel"
                className="p-3"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={handleChange}
                name="phone"
                isInvalid={!!formErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formColor">
              <Form.Label className="fw-bold">
                Color<span className="text-danger">*:</span>
              </Form.Label>
              <Form.Control
                as="select"
                size="sm"
                value={color}
                className="p-3"
                onChange={handleChange}
                name="color"
                isInvalid={!!formErrors.color}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="Gray">Gray</option>
                <option value="Other">other</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.color}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label className="fw-bold">
                Address<span className="text-danger">*:</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder=" Enter CityVillagePincode"
                value={address}
                className="p-3"
                onChange={handleChange}
                name="address"
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
              <span className="sr-only">...</span>
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
