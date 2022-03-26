import { memo, useEffect } from "react";
import { ProjectListScreen } from "Pages/auth-app/project-list";
import ProjectScreen from "Pages/auth-app/project";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import PageHeader from "./header";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useMount } from "utils";

const AuthApp = memo(() => {
  const navigate = useNavigate();
  // useMount(() => {
  //   navigate("/projects");
  // });
  return (
    <Container>
      <Helmet>
        <title>项目列表</title>
      </Helmet>
      <PageHeader />
      <Nav></Nav>
      <Main>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />}></Route>
          <Route
            path="/projects/:projectId/*"
            element={<ProjectScreen />}
          ></Route>
        </Routes>
      </Main>
      <Aside></Aside>
      <Footer></Footer>
    </Container>
  );
});
export default AuthApp;
const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 6rem 1fr 6rem;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-gap: 10rem;
`;

const Nav = styled.nav`
  grid-area: nav;
`;
const Main = styled.main`
  grid-area: main;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
