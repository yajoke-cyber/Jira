import { memo, useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModal } from "./project-list.slice";
import {
  useAddProject,
  useDeleteProject,
  useEditProject,
  useProjectModal,
} from "utils/project";
import IdSelect from "components/id-select";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useUrlQueryParam } from "utils/url";

//redux版本
// const MyDrawer = memo(() => {
//   const dispatch = useDispatch();
//   //读根部的状态树的状态里面的一个部分
//   const projectModalOpen = useSelector(selectProjectModal);
//   return (
//     <Drawer
//       title="Basic Drawer"
//       placement="right"
//       visible={projectModalOpen}
//       onClose={() => {
//         dispatch(projectListActions.closeProjectModal());
//       }}
//     >
//       <p>Some contents...</p>
//       <p>Some contents...</p>
//       <p>Some contents...</p>
//       <Button
//         onClick={() => {
//           dispatch(projectListActions.closeProjectModal());
//         }}
//       >
//         关闭
//       </Button>
//     </Drawer>
//   );
// });

interface FormValue {
  name: string;
  organization: string;
  pin: boolean;
}
const MyDrawer = memo(() => {
  const [searchParams] = useUrlQueryParam(["name", "personId"]);
  const queryKey = ["projects", searchParams];
  const {
    projectModalOpen,
    close,
    isLoading,
    edingProjectId,
    handlingProject,
  } = useProjectModal();

  // 使用return useMutation返回得这两个hook会有同步和异步两种情况,可以选择是否要去等待结果
  const useMutateProject = edingProjectId ? useEditProject : useAddProject;
  const {
    mutate,
    mutateAsync,
    error,
    isLoading: isMutateLoading,
  } = useMutateProject(queryKey);
  const [form] = useForm();
  const onFinsh = (values: FormValue) => {
    mutateAsync({ ...handlingProject, ...values, pin: false }).then(() => {
      form.resetFields();
      close();
    });
  };
  useEffect(() => {
    form.setFieldsValue(handlingProject);
  }, [handlingProject, form]);
  return (
    <Drawer
      //当没有出现抽屉得时候，此时并没有表格渲染上去，所以需要加一个force即没有切换到得时候依然渲染
      forceRender={true}
      title={edingProjectId ? "编辑项目" : "创建项目"}
      placement="right"
      visible={projectModalOpen}
      onClose={() => {
        close();
        form.resetFields();
      }}
      // style={{ width: "100vw" }}
    >
      {isLoading ? (
        <Spin size="large"></Spin>
      ) : (
        <>
          <h1> handlingProject?.name </h1>
          <ErrorBox error={error}></ErrorBox>
          <Form
            form={form}
            layout="vertical"
            style={{ width: "40rem" }}
            onFinish={onFinsh}
          >
            <Form.Item
              label="名称"
              name={"name"}
              rules={[{ required: true, message: "请输入名字" }]}
            >
              <Input placeholder={"请输入项目名称"}></Input>
            </Form.Item>
            <Form.Item
              label="部门"
              name={"organization"}
              rules={[{ required: true, message: "请输入部门名称" }]}
            >
              <Input placeholder={"请输入部门名称"}></Input>
            </Form.Item>
            <Form.Item label="负责人" name={"personId"}>
              <IdSelect defaultOptionName="负责人"></IdSelect>
              {/*这里因为有formItem所以可以不指定value和onChange */}
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                loading={isMutateLoading}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  );
});
export default MyDrawer;
