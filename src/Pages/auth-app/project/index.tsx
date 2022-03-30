import { memo, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Epic from "./epic";
import Kanban from "../kanban/kanban";

const ProjectScreen = memo(() => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("kanban", { replace: true });
  }, []);
  return (
    <>
      {" "}
      <Routes>
        <Route path="/kanban" element={<Kanban />}></Route>
        <Route path="/epic" element={<Epic />}></Route>
      </Routes>{" "}
    </>
  );
});

export default ProjectScreen;
