import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "screens/projectList/projectListSlice";
import { authSlice } from "./authSlice";

/**
 * 将多个reducer汇集在一起
 */
export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth: authSlice.reducer,
};
export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

//分析整个RootState的类型
export type RootState = ReturnType<typeof store.getState>;
