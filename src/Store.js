import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Slice/taskslice";



export const store = configureStore({
    reducer: {
        tasks: taskReducer
        
    }
})