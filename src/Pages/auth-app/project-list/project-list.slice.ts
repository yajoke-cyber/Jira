import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
interface State {
  projectModal: boolean;
}
const initialState: State = {
  projectModal: false,
};
export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    //这里不需要传递数据，所以这里不用使用payload，并且这里根据函数名匹配dispatch，也不需要使用switch
    //这里通过immer使用不纯的方式修改值，但是在底层实际上还是以纯的方式来执行
    openProjectModal(state) {
      state.projectModal = true;
    },
    closeProjectModal(state) {
      state.projectModal = false;
    },
  },
});
export const projectListActions = projectListSlice.actions;
export const selectProjectModal = (state: RootState) =>
  state.kanbanList.projectModal;
//这里相当于把根部的状态分发到具体，然后通过当前的redux部分进行导出，使得获取状态的位置与改变状态的位置结合
