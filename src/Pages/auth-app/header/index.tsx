import { Dropdown, Menu, Button, Popover } from "antd";
import { useAuth } from "context/auth-context";
import { memo } from "react";
import { Row } from "components/lib";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { projectListActions } from "../project-list/project-list.slice";
const PageHeader = memo(() => {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  return (
    <>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>logo</h2>
          <Popover
            content={
              <Button
                type="link"
                onClick={() => {
                  dispatch(projectListActions.openProjectModal());
                }}
              >
                编辑项目
              </Button>
            }
          >
            <h2>项目</h2>
          </Popover>

          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type="link" onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link" style={{ fontSize: "18px" }}>
              Hi,{user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
    </>
  );
});

export default PageHeader;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Header = styled(Row)`
  padding: 3.2rem;
  grid-area: header;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
