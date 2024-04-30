import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  selectedTask: {},
  isLoading:false,
  error:'',

};
const URL='http://localhost:8000/task'
// Get
export const getTasksFromServer = createAsyncThunk(
  "task/getTasksFromServer",
  async (_,{rejectWithValue}) => {
      const response = await fetch(URL)
      if (response.ok) {
          const jsonResponse = await response.json()
          return jsonResponse
      } else {
          return rejectWithValue({error:'No Tasks Found'})
      }
  }
)

//POST 
export const addTaskToServer = createAsyncThunk(
  "task/addTaskToServer",
  async (task,{rejectWithValue}) => {
      const options = {
          method:'POST',
          body: JSON.stringify(task),
          headers: {
              "Content-type":"application/json; charset=UTF-8"
          }
      }
      const response = await fetch(URL,options)
      if (response.ok) {
          const jsonResponse = await response.json()
          return jsonResponse
      } else {
          return rejectWithValue({error:'Task Not Added'})
      }
  }
)
//PUT 
export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task,{rejectWithValue}) => {
      const options = {
          method:'PUT',
          body: JSON.stringify(task),
          headers: {
              "Content-type":"application/json; charset=UTF-8"
          }
      }
      const response = await fetch(URL + '/' + task.id,options)
      if (response.ok) {
          const jsonResponse = await response.json()
          return jsonResponse
      } else {
          return rejectWithValue({error:'Task Not Updated'})
      }
  }
)
export const deleteTaskFromServer = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (task,{rejectWithValue}) => {
      const options = {
          method:'DELETE',
      }
      const response = await fetch(URL + '/' + task.id,options)
      if (response.ok) {
          const jsonResponse = await response.json()
          return jsonResponse
      } else {
          return rejectWithValue({error:'Task Not Deleted'})
      }
  }
)


const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      const task = { ...action.payload, id };
      state.taskList.push(task);
    },
    removeTaskFromList: (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    updateTaskFromList: (state, action) => {
      state.taskList = state.taskList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder
        .addCase(getTasksFromServer.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getTasksFromServer.fulfilled,(state,action) => {
            state.isLoading = false
            state.error = ''
            state.taskList = action.payload
        })
        .addCase(getTasksFromServer.rejected,(state,action) => {
            state.error = action.payload.error
            state.isLoading = false
            state.taskList = []
        })
        .addCase(addTaskToServer.pending,(state) => {
          state.isLoading = true
      })
      .addCase(addTaskToServer.fulfilled,(state,action) => {
          state.isLoading = false
          state.error = ''
          state.taskList.push(action.payload)
      })
      .addCase(addTaskToServer.rejected,(state,action) => {
          state.error = action.payload.error
          state.isLoading = false
      })
      .addCase(updateTaskInServer.pending,(state) => {
        state.isLoading = true
    })
    .addCase(updateTaskInServer.fulfilled,(state,action) => {
        state.isLoading = false
        state.error = ''
        state.taskList = state.taskList.map((task) => task.id === action.payload.id ? action.payload : task )
    })
    .addCase(updateTaskInServer.rejected,(state,action) => {
        state.error = action.payload.error
        state.isLoading = false
    })
    .addCase(deleteTaskFromServer.pending,(state) => {
      state.isLoading = true
  })
  .addCase(deleteTaskFromServer.fulfilled,(state,action) => {
      state.isLoading = false
      state.error = ''
  })
  .addCase(deleteTaskFromServer.rejected,(state,action) => {
      state.error = action.payload.error
      state.isLoading = false
  })
}
});

export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskFromList,
  setSelectedTask,
} = taskSlice.actions; 

export default taskSlice.reducer;
