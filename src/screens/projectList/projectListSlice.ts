import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
interface State {
    projectModalOpen: boolean;
}
/**初始数据 */
const initialState: State = {
    projectModalOpen: false,
};
export const projectListSlice = createSlice({
    name: "projectListSlice", //名称
    initialState, //初值
    reducers: {
        //aciton方法
        //redux-toolkit会对脏操作进行处理，所以可以直接改state的值
        openProjectModal(state) {
            state.projectModalOpen = true;
        },
        closeProjectModal(state) {
            state.projectModalOpen = false;
        },
    },
});

export const projectListActions = projectListSlice.actions;
//向外提供一个访问数据的方法
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
