import { Select } from "antd";
import { useEffect, useState } from "react";
import { useHttp } from "utils";
//用react工具库可以通过组件爬到Props，不用自己去手动找
type SelectProps = React.ComponentProps<typeof Select>;
//但是这里会存在属性冲突问题,有同名，因此需要删除掉他原本的，因为我们可以确保我们传递的是正确的
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: number | string | undefined | null;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name?: string; id?: number }[];
}

// value可以传入多种类型的值
//但是onchange只会回调number类型的值，并且将对应的string强行转为number
const IdSelect = (props: IdSelectProps) => {
  const [users, setUsers] = useState(null);
  const client = useHttp();
  useEffect(() => {
    client("users").then((res) => {
      setUsers(res);
    });
  }, [client]);
  const { value, onChange, defaultOptionName, options } = props;
  //value这里是指select的选择值，在这里应该是对应的number
  return (
    //   这里得到的value就是对应option传入的值
    //用户在这里会调用传下来的onChange然后去执行，因此这里的value对应的应该是Number
    //在这里需要透传select多余的属性，因此这里需要继承默认属性
    <Select
      value={toNumber(value)}
      // 处理函数不存在得情况，直接?.
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {(options || users)?.map((data) => {
        return (
          <Select.Option key={data.id} value={data.id}>
            {data.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default IdSelect;
//将对应的值转为必定数字
//这里的value的tonumber就注定你传字符串和数字都是可以的了
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
