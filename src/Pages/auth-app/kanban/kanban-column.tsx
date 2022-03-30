import { time } from "console";
import styled from "styled-components";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks();

  //这里的tasks是所有的tasks，这里需要找到和kanban id对应的tasks
  //同时这里渲染了三个列表，本应该请求三次tasks但是这里只请求一次，这是由于react-query会在2s内捕获和一个请求之后相同的请求，
  //只返回第一个请求的结果，让我们可以放心大胆的使用hooks，这个间断时间是可以人为设置的
  const tasks = allTasks?.filter((item) => item.kanbanId === kanban.id);
  //   const tasks
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
