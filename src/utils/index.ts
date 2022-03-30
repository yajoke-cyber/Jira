import { useCallback, useEffect, useRef, useState } from "react";
import qs from "qs";
import { useAuth } from "context/auth-context";
//判断，如果state为空，且是非0值返回false，否则如果为0返回true
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
//使用unknown比any更好，更安全，没限制传入，但是会限制其使用
//使用obj，当对应的值为空或者undefined的时候，将其去掉，不发送给后端，以免出现歧义（比如前端到底是要属性为空的对象，还是需要所有name对象）
export const cleanObj = (obj: object) => {
  //不能改变传入的对象，遵守封装原则，使用纯函数
  const res: any = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (isFalsy(res[key])) {
      delete res[key];
    }
  });
  return res;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line
};
//在这里如果run usecallback传出的，则我们的网页每次渲染都可以拿到旧的run的地址，而不会每次拿到一个新的run，所以这里需要对run进行useCallback封装
//useCallback是一个特殊版本的useMemo，根据依赖列表来决定是否要渲染一个新的run函数
//并且限制每次传入的函数为之前的也可以有效防止这个函数的依赖，不会以为其在依赖列表并且每次渲染导致函数更新使其无限报错（使其不影响其他人使用）
//我们制作的hook因为本本身就是一个变量，如果其他人在useEffect使用的话是肯定会警告的，所以这里需要用useCallback去进行优化，让其他人使用没有问题
//成为一名优秀的hooks开发者
//?代表可以不传，此时setTimeOut默认间隔为0
export const useDebounce = <V>(value: V, time?: number) => {
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
export const useArray = <T>(arr: T[]) => {
  const [value, setValue] = useState(arr);
  const add = (item: T) => {
    setValue([...value, item]);
  };
  const clear = () => {
    setValue([]);
  };
  const remove = (index: number) => {
    const newArr = value.filter((data, i) => i !== index);
    setValue(newArr);
  };
  // useEffect(()=>{},[value]);
  return {
    value,
    add,
    clear,
    remove,
  };
};
const API = process.env.REACT_APP_API_URL;
export interface Config extends RequestInit {
  token?: string;
  data?: Object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  //通过设定默认参数，可以使其自动可选
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET")
    endpoint = `${endpoint}?${qs.stringify(data)}`;
  //qs会根据url路径的方式来对对应的数据解析
  else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${API}/${endpoint}`, config).then(async (res) => {
    const data = await res.json();

    if (res.status === 401) {
      return Promise.reject({ message: "请重新登录" });
    }
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
  //axios和fetch表现不一样，fetch只有在断网的时候才会触发catch的异常捕获，而axios当状态码为4XX时就会触发异常捕获
};
export const useHttp = () => {
  const { user } = useAuth();

  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
  //获取其函数参数类型,并且使用结构符号让参数可以解放出来,不会影响后续参数传递
};
//检测组件是否卸载，来觉得是否要执行超时在已挂载组件执行异步的setdata导致报错
export const useMountRef = () => {
  const mountRef = useRef(false);
  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);
  return mountRef;
};
