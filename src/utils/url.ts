import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObj } from "utils";
// export const useUrlQueryParam = (keys: string[]) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   return [
//     keys.reduce((prev: {}, key: string) => {
//       return { ...prev, [key]: searchParams.get(key) };
//     }, {} as { [key in string]: string }),
//     setSearchParams,
//   ] as const;
// };
//当没有 as const时，返回值默认为reuce传入得初始值得类型，也就是空对象
//当有as const时，会

//const a = ["numer", 1, 2];
//元组数组如果类型不一致，则会给其赋值每一种类型的联合，极为每一个的基类
//所以这里如果加上 as const的话会让默认显示本身的元素,，让其每一个元素的类型原汁原味同时不可修改
// const a = ["numer", 1, 2] as const;
//如果这里 使用as { [key in string]: string }) 会让得出来的对象的类型为[key in string]: string ，在后续的赋值操作中肯定会飘红
//因此这里需要给到得到的对象具体的key值而不是一个大概的，要一个准确的值
// 所以以下第二版
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev: { [key in K]: string }, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams] // eslint-disable-line
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      //cleanobj可以将属性中为null或者空的key值直接清除
      const obj = cleanObj({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(obj);
      //用这个fromEntries可以将可以拥有迭代的对象或者数组转变为对象,就可以实现数组也能修改
      //通过ctrl左键找到其原类型，然后拿过来直接as就可以脱离约束
    },
  ] as const;
};
//通过以上的方法就可以完美实现读取
//但是如果使用上述方法需要加入useMemo读取参数，
// 因为每一次传入的数组地址都是不一样的，当params作为props更新的时候，都会触发render进而传入新的数组，
// 导致又重新执行，返回新的state，然后就无限循环了，所以要用useMemo去对比值，如果值没变则不会触发循环
