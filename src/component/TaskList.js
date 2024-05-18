import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";
import { getTasksFromServer, deleteTaskFromServer } from "../Slice/taskThunk";
import { removeTaskFromList, setSelectedTask } from "../Slice/taskslice";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { FaFilter } from "react-icons/fa";
import { saveAs } from "file-saver";
import "./tasklist.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ModalSpinner from "../Spinner/Spinner";

const TaskList = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  // useEffect(() => {
  //   dispatch(getTasksFromServer());
  // }, [dispatch]);
  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        await dispatch(getTasksFromServer());
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false); // Ensure loading is set to false even if an error occurs
      }
    };

    fetchData();
  }, [dispatch]);

  const updateTask = async (task) => {
    setLoading(true);
    try {
      await dispatch(setSelectedTask(task));
      await dispatch(getTasksFromServer());
      navigate("/vehicle-update");
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      setLoading(true);
      try {
        await dispatch(deleteTaskFromServer(taskToDelete)).unwrap();
        dispatch(removeTaskFromList(taskToDelete));
        setShowDeleteModal(false);
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

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-success rounded-pill m-2"
          onClick={() => updateTask(rowData)}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger rounded-pill m-2"
          onClick={() => handleShowModal(rowData)}
        />
      </div>
    );
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then((autoTable) => {
        const doc = new jsPDF.default();
        doc.autoTable({
          head: [
            [
              "Customer Name",
              "Vehicle Modal",
              "Vehicle Identification Number",
              "Phone",
              "Year",
              "Color",
              "Address",
              "Current Millage",
            ],
          ],
          body: tasksList.map((row) => [
            row.name,
            row.modal,
            row.vin,
            row.phone,
            row.year,
            row.color,
            row.address,
            row.millage,
          ]),
        });

        doc.save("Task Details.pdf");
      });
    });
  };


  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          className="ms-4 rounded"
          severity="success"
          onClick={() => navigate("/vehicle-registration")}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div>
    
     
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          className="ms-2 rounded-pill"
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleClear = () => {
    setSearchText("");
    handleReset();
  };
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const filteredTasks = tasksList.filter((task) =>
    Object.values(task).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  <div></div>;

  return (
    <>
      <div className="scroll-container ">
        <div className="d-flex justify-content-center">
          <div className="col-md-10 mb-5 card p-3 mt-3 shadow">
            <Toolbar
              className="mb-4"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            ></Toolbar>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-md-10 card p-3  shadow mb-5">
            <div className="d-flex p-toolbar">
              <div className="table-responsive">
                {loading && <ModalSpinner />}

                <div className="d-flex justify-content-center">
                <h1>Vehicle View</h1>
                  <div className="ms-auto">
                    <Button
                      className="button me-3 rounded"
                      onClick={handleClear}
                    >
                      Clear
                      <FaFilter />
                    </Button>
                    <InputText
                      placeholder="Search..."
                      className="mt-2"
                      value={searchText}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <DataTable
                  value={filteredTasks}
                  ref={formRef}
                  paginator
                  rows={5}
                  columnResizeMode="expand"
                  resizableColumns
                  showGridlines
                  dataKey="id"
                  className="custom-datatable-style shadow rounded container border-info mt-3"
                  selection={selectedRows}
                  onSelectionChange={(e) => setSelectedRows(e.value)}
                  rowsPerPageOptions={[5, 10, 25]}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tasks"
                >
                  {/* <Column
                    header="# S.No"
                    body={(rowData, index) => index + 1}
                  ></Column> */}
                  <Column
                    field="name"
                    header="Customer Name"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                  <Column
                    field="modal"
                    header="Vehicle Modal"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                  <Column
                    field="vin"
                    header="Vehicle Identification Number"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                  <Column
                    field="phone"
                    header="Phone"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                  <Column
                    field="year"
                    header="Year"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                  <Column field="color" header="Color"></Column>
                  <Column
                    field="address"
                    header="Address"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                  <Column
                    field="millage"
                    header="Current Millage"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                  <Column
                    body={actionTemplate}
                    header="Actions"
                    sortable
                    className="text-center"
                    filter
                    style={{ width: "13%" }}
                  ></Column>
                </DataTable>

                {/* Delete confirmation modal */}
                <Dialog visible={showDeleteModal} onHide={handleCloseModal}>
                  <div>Are you sure you want to delete this task?</div>
                  <div className="p-d-flex p-jc-between mt-3 ms-5">
                    <Button label="Cancel" onClick={handleCloseModal} />
                    <Button
                      label="Delete"
                      onClick={handleDelete}
                      className="p-button-danger ms-2"
                    />
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
