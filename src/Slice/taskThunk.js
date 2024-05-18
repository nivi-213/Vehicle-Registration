import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://651289a1b8c6ce52b395c5fb.mockapi.io/datalist";

// GET
export const getTasksFromServer = createAsyncThunk(
  "task/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        return rejectWithValue({ error: "No Tasks Found" });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// POST
export const addTaskToServer = createAsyncThunk(
  "task/addTaskToServer",
  async (task, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(BASE_URL, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        return rejectWithValue({ error: "Task Not Added" });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// Put
export const updateTaskInServer = createAsyncThunk(
  "task/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    try {
      const options = {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(BASE_URL + "/" + task.id, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        return rejectWithValue({ error: "Task Not Updated" });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// DELETE
export const deleteTaskFromServer = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (task, { rejectWithValue }) => {
    try {
      const options = {
        method: 'DELETE',
      }
      const response = await fetch(BASE_URL + '/' + task.id, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        return rejectWithValue({ error: 'Task Not Deleted' });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);
