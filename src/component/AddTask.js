import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../Slice/taskThunk";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";
import Toast from "react-bootstrap/Toast";

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
  const [millage, setMillage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const resetFormErrors = () => {
    setFormErrors({});
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
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          modal: value.trim() ? "" : "Please enter your modal.",
        }));
        break;
      case "vin":
        setVin(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          vin: value.trim()
            ? ""
            : "Please enter your vehicle identification number.",
        }));
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
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          year: value.trim() ? "" : "Please enter your year.",
        }));
        break;
      case "address":
        setAddress(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          address: value.trim() ? "" : "Please enter your address.",
        }));
        break;
      case "color":
        setColor(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          color: value.trim() ? "" : "Please select your color.",
        }));
        break;
      case "millage":
        setMillage(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          millage: value.trim() ? "" : "Please enter current millage.",
        }));
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
    if (!millage.trim()) {
      errors.millage = "Please enter current millage.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(
        addTaskToServer({
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
      resetForm();

      setName("");
      setModal("");
      setVin("");
      setPhone("");
      setYear("");
      setAddress("");
      setColor("");
      setMillage("");
      resetFormErrors();
      setIsLoading(false);
      navigate("/vehicle-view");
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
  const resetForm = () => {
    setName("");
    setModal("");
    setVin("");
    setPhone("");
    setYear("");
    setAddress("");
    setColor("");
    setMillage("");
    resetFormErrors();
  };

  return (
    <div className="scroll-container">
      <div className="background-image">
        <div className="card-container">
          <section className=" ">
            <div class="header-logo">
              {/* <img
                src="https://www.jotform.com/uploads/ugurg/form_files/Post3.65b1272ac4b291.79834324.png"
                alt="Vehicle Registration Form"
                width="752"
                className="header-logo-top"
              /> */}
            </div>
            <div class="header-text httal htvam">
              <h1 id="header_1" className="form-header ">
                Vehicle Registration
              </h1>
            </div>

            <Form className="container p-3 mx-auto">
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label className="fw-bold">Customer Name</Form.Label>

                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Enter customer"
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
                      Vehicle Modal
                      <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      size="sm"
                      placeholder="Enter modal"
                      type="number"
                      value={modal}
                      className="p-2"
                      onChange={handleChange}
                      name="modal"
                      isInvalid={!!formErrors.modal}
                    />

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
                      {/* <FontAwesomeIcon icon={faKey} style={{ color: "green" }} />{" "} */}
                      Vehicle Identification Number
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      placeholder="Enter vin"
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
                      {/* <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ color: "purple" }}
                    />{" "} */}
                      Year
                      <span className="text-danger">*</span>
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
                      <option value="">Please Select </option>
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
                      {/* <FontAwesomeIcon
                      icon={faPhone}
                      style={{ color: "green" }}
                    />{" "} */}
                      Phone Number
                      <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      size="sm"
                      type="number"
                      className="p-2"
                      placeholder="(000)000-000"
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
                      {/* <FontAwesomeIcon
                      icon={faPalette}
                      style={{ color: "blue" }}
                    />{" "} */}
                      Color
                      {/* <span className="text-danger">*</span> */}
                    </Form.Label>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={color}
                      placeholder="Enter color"
                      className="p-2"
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
                      {/* <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ color: "red" }}
                    />{" "} */}
                      Address
                      <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter address"
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
                      type="number"
                      className="p-2"
                      placeholder="Enter millage"
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
              <div className="text-end mt-4">
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                  </Spinner>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                    <Button variant="primary" type="submit" onClick={addTask}>
                      Submit
                    </Button>
                  </>
                )}
              </div>
            </Form>
          </section>
      
            <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed bottom-0 end-0 m-3 c"
        delay={3000}
        autohide
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Spinner from "react-bootstrap/Spinner";
// import { useDispatch } from "react-redux";
// import { addTaskToServer } from "../Slice/taskThunk";
// import { useNavigate } from "react-router-dom";
// import "./AddTask.css";
// import Toast from "react-bootstrap/Toast";

// const AddTask = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [modal, setModal] = useState("");
//   const [color, setColor] = useState("");
//   const [vin, setVin] = useState("");
//   const [phone, setPhone] = useState("");
//   const [year, setYear] = useState("");
//   const [address, setAddress] = useState("");
//   const [millage, setMillage] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");

//   const resetFormErrors = () => {
//     setFormErrors({});
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     switch (name) {
//       case "firstName":
//         const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
//         setName(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           name: value.trim()
//             ? nameRegex.test(value)
//               ? ""
//               : "Please enter a valid customer name."
//             : "Please enter your customer name.",
//           invalidName:
//             value.trim() && !nameRegex.test(value)
//               ? "Please enter a valid name without numbers or special characters."
//               : "",
//         }));
//         break;

//       case "modal":
//         setModal(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           modal: value.trim() ? "" : "Please enter your modal.",
//         }));
//         break;
//       case "vin":
//         setVin(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           vin: value.trim()
//             ? ""
//             : "Please enter your vehicle identification number.",
//         }));
//         break;
//       case "phone":
//         const phoneRegex = /^(?!(0{10}))[0-9]{10}$/;
//         const isValidPhone = phoneRegex.test(value);
//         setPhone(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           phone: isValidPhone
//             ? ""
//             : "Please enter a valid 10-digit phone number.",
//         }));
//         break;
//       case "year":
//         setYear(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           year: value.trim() ? "" : "Please enter your year.",
//         }));
//         break;
//       case "address":
//         setAddress(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           address: value.trim() ? "" : "Please enter your address.",
//         }));
//         break;
//       case "color":
//         setColor(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           color: value.trim() ? "" : "Please select your color.",
//         }));
//         break;
//       case "millage":
//         setMillage(value);
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           millage: value.trim() ? "" : "Please enter current millage.",
//         }));
//         break;
//       default:
//         break;
//     }
//   };

//   const addTask = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const errors = {};

//     if (!name.trim()) {
//       errors.name = "Please enter your first name.";
//     }
//     if (!modal.trim()) {
//       errors.modal = "Please enter your modal.";
//     }
//     if (!vin.trim()) {
//       errors.vin = "Please enter your vehicle identification number.";
//     }
//     if (!phone.trim()) {
//       errors.phone = "Please enter your phone number.";
//     }
//     if (!year.trim()) {
//       errors.year = "Please enter your year.";
//     }
//     if (!address.trim()) {
//       errors.address = "Please enter your address.";
//     }
//     if (!color) {
//       errors.color = "Please select your color.";
//     }
//     if (!millage.trim()) {
//       errors.millage = "Please enter current millage.";
//     }

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await dispatch(
//         addTaskToServer({
//           name,
//           modal,
//           vin,
//           phone,
//           year,
//           address,
//           color,
//           millage,
//         })
//       );
//       resetForm();
//       setShowToast(true);
//       setToastMessage("Task added successfully!");
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error adding task:", error);
//       setIsLoading(false);
//     }
//   };

//   const years = [];
//   const currentYear = new Date().getFullYear();
//   for (let i = currentYear; i >= currentYear - 100; i--) {
//     years.push(i);
//   }
//   const resetForm = () => {
//     setName("");
//     setModal("");
//     setVin("");
//     setPhone("");
//     setYear("");
//     setAddress("");
//     setColor("");
//     setMillage("");
//     resetFormErrors();
//   };
//   const years = [];
//   const currentYear = new Date().getFullYear();
//   for (let i = currentYear; i >= currentYear - 100; i--) {
//     years.push(i);
//   }
//   return (
//     <div className="scroll-container">
//       <div className="background-image">
//         <div className="card-container">
//           <section className="">
//             <div className="header-logo"></div>
//             <div className="header-text httal htvam">
//               <h1 id="header_1" className="form-header ">
//                 Vehicle Registration
//               </h1>
//             </div>
//             <Form className="container p-3 mx-auto">
//               <div className="row">
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formFirstName">
//                     <Form.Label className="fw-bold">Customer Name</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="text"
//                       placeholder="Enter customer"
//                       value={name}
//                       className="p-2"
//                       onChange={handleChange}
//                       name="firstName"
//                       isInvalid={!!formErrors.name}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.name}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formModal">
//                     <Form.Label className="fw-bold">Modal</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="text"
//                       placeholder="Enter modal"
//                       value={modal}
//                       className="p-2"
//                       onChange={handleChange}
//                       name="modal"
//                       isInvalid={!!formErrors.modal}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.modal}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formVIN">
//                     <Form.Label className="fw-bold">Vehicle Identification Number (VIN)</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="text"
//                       placeholder="Enter VIN"
//                       value={vin}
//                       className="p-2"
//                       onChange={handleChange}
//                       name="vin"
//                       isInvalid={!!formErrors.vin}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.vin}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formPhone">
//                     <Form.Label className="fw-bold">Phone Number</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="text"
//                       placeholder="Enter phone number"
//                       value={phone}
//                       className="p-2"
//                       onChange={handleChange}
//                       name="phone"
//                       isInvalid={!!formErrors.phone}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.phone}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formYear">
//                     <Form.Label className="fw-bold">Year</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="text"
//                       placeholder="Enter year"
//                       value={year}
//                       className="p-2"
//                       onChange={handleChange}
//                       name="year"
//                       isInvalid={!!formErrors.year}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.year}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formAddress">
//                     <Form.Label className="fw-bold">Address</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="text"
//                       placeholder="Enter address"
//                       value={address}
//                       className="p-2"
//                       onChange={handleChange}
//                       name="address"
//                       isInvalid={!!formErrors.address}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.address}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formColor">
//                     <Form.Label className="fw-bold">Color</Form.Label>
//                     <Form.Control
//                       as="select"
//                       size="sm"
//                       value={color}
//                       onChange={handleChange}
//                       name="color"
//                       isInvalid={!!formErrors.color}
//                     >
//                       <option value="">Select Color</option>
//                       <option value="red">Red</option>
//                       <option value="blue">Blue</option>
//                       <option value="green">Green</option>
//                     </Form.Control>
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.color}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Group className="mb-3" controlId="formMillage">
//                     <Form.Label className="fw-bold">Current Millage</Form.Label>
//                     <Form.Control
//                       size="sm"
//                       type="text"
//                       placeholder="Enter current millage"
//                       value={millage}
//                       className="p-2"
//                       onChange={handleChange}
//                       name="millage"
//                       isInvalid={!!formErrors.millage}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formErrors.millage}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </div>
//               </div>
//               <Button
//                 variant="primary"
//                 className="text-end ms-auto"
//                 type="submit"
//                 onClick={addTask}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Spinner
//                       as="span"
//                       animation="border"
//                       size="sm"
//                       role="status"
//                       aria-hidden="true"
//                     />
//                     &nbsp; 
//                   </>
//                 ) : (
//                   "Submit"
//                 )}
//               </Button>
//             </Form>
//           </section>
//         </div>
//       </div>
   
//     </div>


// );
// };

// export default AddTask;

             
