import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskInServer } from "../Slice/taskThunk";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

const MyVerticalCenteredModal = () => {
  const { selectedTask } = useSelector((state) => state.tasks);
  const [name, setName] = useState("");
  const [modal, setModal] = useState("");
  const [vin, setVin] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [color, setColor] = useState("");
  const [millage, setMillage] = useState("");
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setName(selectedTask.name);
      setModal(selectedTask.modal);
      setVin(selectedTask.vin);
      setPhone(selectedTask.phone);
      setYear(selectedTask.year);
      setAddress(selectedTask.address);
      setColor(selectedTask.color);
      setMillage(selectedTask.millage);
      setId(selectedTask.id);
    }
  }, [selectedTask]);

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) {
      errors.name = "Please enter your first name.";
    }
    if (!modal.trim()) {
      errors.modal = "Please enter make.";
    }
    if (!vin.trim()) {
      errors.vin = "Please enter your vehicle identification number.";
    }
    const phoneRegex = /^(?!(0{10}))[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!year.trim()) {
      errors.year = "Please enter your year.";
    }
    if (!color.trim()) {
      errors.color = "Please select your color.";
    }
    if (!address.trim()) {
      errors.address = "Please enter your address.";
    }
    if (!millage.trim()) {
      errors.millage = "Please enter current millage.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        setName(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: value.trim()
            ? nameRegex.test(value)
              ? ""
              : "Please enter a valid customer name."
            : "Please enter your customer name.",
          invalidName:
            value.trim() && !nameRegex.test(value)
              ? "Please enter a valid name without numbers or special characters."
              : "",
        }));
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
      case "millage":
        setMillage(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          millage: value.trim() ? "" : "Please enter current millage.",
        }));
        break;
        break;
      default:
        break;
    }
  };
  const updateTask = async (e) => {
    e.preventDefault();
    const isValidForm = validateForm();
    if (!isValidForm) return;

    setIsLoading(true);
    try {
      await dispatch(
        updateTaskInServer({
          id,
          name,
          modal,
          vin,
          phone,
          year,
          address,
          color,
          millage,
        })
      );
      navigate("/vehicle-view");
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= currentYear - 100; i--) {
    years.push(i);
  }
  return (
    <div className="scroll-container">
    <div className="background-image">
      <div className="card-container">
        <section className="">
          <div class="header-logo">
            {/* <img
              src="https://www.jotform.com/uploads/ugurg/form_files/Post3.65b1272ac4b291.79834324.png"
              alt="Vehicle Registration Form"
              width="752"
              class="header-logo-top"
            /> */}
          </div>
          <div class="header-text httal htvam">
            <h1 id="header_1" class="form-header">
              Update Vehicle
            </h1>
          </div>

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
                    className="p-2"
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
                    value={modal}
                    className="p-2"
                    onChange={handleChange}
                    name="modal"
                    isInvalid={!!formErrors.modal}
                  ></Form.Control>
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
                    className="p-2"
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
                    className="p-2"
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
                    className="p-2"
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
                    className="p-2"
                    onChange={handleChange}
                    name="color"
                    isInvalid={!!formErrors.color}
                  >
                    <option value="">Select Color</option>
                    <option value="Black">Black</option>
                    <option value="">Gray</option>
                    <option value="Other">other</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.color}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              {" "}
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
                    className="p-2"
                    onChange={handleChange}
                    name="address"
                    isInvalid={!!formErrors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formMillage">
                  <Form.Label className="fw-bold">
                    Current Millage
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="number" // Changed input type to "number"
                    className="p-2"
                    placeholder="e.g., 50000"
                    value={millage}
                    onChange={handleChange}
                    name="millage"
                    isInvalid={!!formErrors.millage}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.millage}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <div className="text-center mt-4">
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only"></span>
                </Spinner>
              ) : (
                // Render the submit button if not loading
                <Button variant="primary" type="submit" onClick={updateTask}>
                  update
                </Button>
              )}
            </div>
          </Form>
        </section>
      </div>
      </div>
      </div>
  );
};

export default MyVerticalCenteredModal;
