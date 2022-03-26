import { useCallback, useState } from "react";
import { useMountRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "error" | "success" | "loading";
}
const defaultState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};
const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initState?: State<D>,
  initconfig?: typeof defaultConfig
) => {
  const config = { ...initconfig, ...defaultConfig };
  const [state, setState] = useState({
    ...defaultState,
    ...initState,
  });
  const mountRef = useMountRef();
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) => setState({ data, error: null, stat: "success" }),
    []
  );
  const setError = useCallback(
    (error: Error) => setState({ data: null, error, stat: "error" }),
    []
  );
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry?: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise");
      } else {
        if (runConfig?.retry) {
          setRetry(() => {
            if (typeof runConfig.retry === "function")
              return run(runConfig.retry(), runConfig);
          });
        }
        // setLoading();
        setState((t) => ({ ...t, stat: "loading" }));
        //这里如果修改state，结果又在依赖里面用state就会导致无限循环，所以这里需要使用函数用法，就不会使用到state变量
        return promise
          .then((res) => {
            if (mountRef.current) setData(res);
            return res;
          })
          .catch((error) => {
            //catch会自己消化error导致异常不能被外界捕获
            if (config.throwOnError) {
              Promise.reject(error);
            }
            setError(error);
            return error;
          });
      }
    },
    [mountRef, setData, config.throwOnError, setError]
    // [mountRef, setData, config.throwOnError, setError, state]
    //切记这里不能传setdata，因为依赖里面会使用setdata更新state值，而这里又会因为setdata函数的更新而继续调用，进而形成无限循环
    //同理我们去修改useHttp函数
  );

  return {
    isSuccess: state.stat === "success",
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    setData,
    run,
    ...state,
    retry,
  };
};
