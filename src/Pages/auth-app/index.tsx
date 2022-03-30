import { memo, useEffect } from "react";
import { ProjectListScreen } from "Pages/auth-app/project-list";
import ProjectScreen from "Pages/auth-app/project";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import PageHeader from "./header";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useMount } from "utils";
import { Provider } from "react-redux";
import { store } from "store";
import MyDrawer from "./project-list/drawer";
import { QueryClient, QueryClientProvider } from "react-query";

const AuthApp = memo(() => {
  const navigate = useNavigate();
  // useMount(() => {
  //   navigate("/projects");
  // });
  const quertclient = new QueryClient();
  return (
    <QueryClientProvider client={quertclient}>
      <Provider store={store}>
        {/* redux所需要使用的provider */}
        <MyDrawer></MyDrawer>
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
            {/* <Navigate to={"/projects"}></Navigate> */}
          </Main>
          <Aside></Aside>
          <Footer></Footer>
        </Container>
      </Provider>
    </QueryClientProvider>
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
