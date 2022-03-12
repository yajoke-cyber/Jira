import { useEffect, useState } from "react";

//判断，如果state为空，且是非0值返回true，否则如果为0返回false
export const isFalsy = (value) => (value === 0 ? false : !value);
//使用obj，当对应的值为空或者undefined的时候，将其去掉，不发送给后端，以免出现歧义（比如前端到底是要属性为空的对象，还是需要所有name对象）
export const cleanObj = (obj) => {
  //不能改变传入的对象，遵守封装原则，使用纯函数
  const res = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (isFalsy(res[key])) {
      console.log(key);
      delete res[key];
    }
  });
  return res;
};
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, [callback]);
};
export const useDebounce = (value, time = 100) => {
  //使用useState可以判断传过来的value是否改变，若不变，则不会触发useEffect函数
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [value, time]);
  return debounceValue;
  //通过返回的debounceValue，返回给原先组件的一个变量，然后其组件可以用useEffect来依赖返回的变量，就可以实现debounce效果，并且只是值的改变
};
