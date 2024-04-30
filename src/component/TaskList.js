import React, { useState } from "react";
import MyVerticalCenteredModal from "./UpdateTask";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setSelectedTask, removeTaskFromList, getTasksFromServer ,deleteTaskFromServer} from "../Slice/taskslice";
import { useEffect } from "react";

const TaskList = () => {
  const { taskList } = useSelector((state) => state.tasks);

  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const updateTask = (task) => {
    console.log("update Task");
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

useEffect(() => {
 dispatch(getTasksFromServer())
}, [dispatch])


const deleteTask = (task) => {
  console.log("delete task");
  dispatch(deleteTaskFromServer(task))
  .unwrap()
  .then(() => {
    dispatch(removeTaskFromList(task))
  })
};

  // const deleteTask = (task) => {
  //   dispatch(removeTaskFromList(task));
  //   console.log("delete Task");
  // };
  return (
    <div>
      <table className="mt-3 table table-striped table-bordered table-responsive">
        <thead>
          <tr className="text-center">
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskList &&
            taskList.map((task, index) => {
              return (
                <tr className="text-center " key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => updateTask(task)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTask(task)}
                      className="btn btn-danger ms-2"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <MyVerticalCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default TaskList;
