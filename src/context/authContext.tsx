import React, { ReactNode, useState } from "react";
import * as auth from "authProvider";
import { User } from "screens/projectList/SearchPanel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallBack, FullPageLoading } from "components/lib";
interface AuthForm {
    username: string;
    password: string;
}
const AuthContext = React.createContext<
    | {
          user: User | null;
          login: (form: AuthForm) => Promise<void>;
          register: (form: AuthForm) => Promise<void>;
          loginOut: () => Promise<void>;
      }
    | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

/**初始化user */
const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http("me", { token });
        return data.user;
    } else {
        return user;
    }
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { run, data: user, setData: setUser, error, isLoading, isIdle, isError } = useAsync<User | null>();
    const login = (form: AuthForm) => {
        return auth.login(form).then((res) => {
            setUser(res);
        });
    };
    const register = (form: AuthForm) => {
        return auth.register(form).then((res) => {
            setUser(res);
        });
    };
    const loginOut = () => {
        return auth.loginOut().then((res) => {
            setUser(null);
        });
    };
    //初始化更新时候调用
    useMount(() => {
        run(bootstrapUser());
    });
    //加载中
    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }
    //出现错误
    if (isError) {
        return <FullPageErrorFallBack error={error} />;
    }
    return <AuthContext.Provider children={children} value={{ user, login, register, loginOut }}></AuthContext.Provider>;
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AutoProvider中使用");
    }
    return context;
};
