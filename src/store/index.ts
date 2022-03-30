import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "Pages/auth-app/project-list/project-list.slice";

//把局部的reducer注册到整体
export const rootReducer = {
  kanbanList: projectListSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});
//这里直接通过对象的方式将reducer和rootReducer绑定，不用想之前还需要划分一个useReducer（本身其应该属于context部分）
//或者使用mapStateTo,这种负责的方式将状态与reducer绑定
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
