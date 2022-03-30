import React, { memo } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useProjectInUrl } from "./util";

const Kanban = memo(() => {
  const { data: kanbans } = useKanbans();
  const { data: currentProject } = useProjectInUrl();
  return (
    <>
      <h1>{currentProject?.[0].name}</h1>
      <Helmet>
        <title>看板列表</title>
      </Helmet>

      <ColumnContainer>
        {kanbans?.map((item) => (
          <KanbanColumn kanban={item}></KanbanColumn>
        ))}
      </ColumnContainer>
    </>
  );
});

export default Kanban;
const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
