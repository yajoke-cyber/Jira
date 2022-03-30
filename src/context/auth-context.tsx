import React, { Dispatch, useEffect, ReactNode } from "react";
import * as Auth from "provider/auth-provider";
import { User } from "Pages/auth-app/project-list/search-panel";
import { http } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageError, FullPageSpin } from "components/lib";
import { useQueryClient } from "react-query";
const AuthContext = React.createContext<
  | undefined
  | {
      user: User | null;
      login: (form: UserForm) => Promise<void>;
      register: (form: UserForm) => Promise<void>;
      logout: () => Promise<void>;
      setUser: Dispatch<User | null>;
    }
>(undefined);
AuthContext.displayName = "AuthContext";
interface UserForm {
  username: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    isError,
    isIdle,
    isLoading,
    error,
    run,
  } = useAsync<User | null>();
  // const queryClient = useQueryClient();
  const login = (data: UserForm) => Auth.login(data).then(setUser);
  const register = (data: UserForm) => Auth.register(data).then(setUser);
  const logout = () =>
    Auth.logout().then(() => {
      //登出时清除缓存，防止其重新登录用户时会直接读取上一个用户的缓存，然后等到数据发送到以后才会更新最新的数据
      setUser(null);
      // queryClient.clear();
    });

  //

  useEffect(() => {
    run(initUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isIdle || isLoading) {
    return <FullPageSpin></FullPageSpin>;
  }
  if (isError) {
    return <FullPageError error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout, setUser }}
    />
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthContext环境下使用!");
  }
  return context;
};
export const initUser = async () => {
  let user = null;
  const token = Auth.getToken();
  //如果本地获取到了token
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
