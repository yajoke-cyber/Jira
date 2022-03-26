import { Rate } from "antd";
import React, { memo } from "react";
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked?: boolean) => void;
}
const Pin = memo(({ checked, onCheckedChange, ...props }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0} //这里onCheckedChange为undefined的时候不能当函数调用的,因为要判断到底是展示星星还是交互星星
      // onCheckedChange(!!num);
      //所以要使用函数调用的新特性 ?.
      onChange={(num) => onCheckedChange?.(!!num)}
      {...props}
    ></Rate>
  );
});

export default Pin;
