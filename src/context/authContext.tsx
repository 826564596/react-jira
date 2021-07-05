import React, { ReactNode } from "react";
import * as auth from "authProvider";
import * as authStore from "store/authSlice";

import { User } from "screens/projectList/searchPanel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/authSlice";
import { useCallback } from "react";
export interface AuthForm {
    username: string;
    password: string;
}

/**初始化user */

export const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http("me", { token });
        user = data.user;
    }
    return user;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { run, error, isLoading, isIdle, isError } = useAsync<User | null>();
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
    //初始化更新时候调用
    useMount(() => {
        run(dispatch(authStore.bootstrap()));
    });
    //加载中
    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }
    //出现错误
    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }
    return <div>{children}</div>;
};

export const useAuth = () => {
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
    const user = useSelector(selectUser);
    const login = useCallback((from: AuthForm) => dispatch(authStore.login(from)), [dispatch]);
    const register = useCallback((from: AuthForm) => dispatch(authStore.register(from)), [dispatch]);
    const loginOut = useCallback(() => dispatch(authStore.loginOut()), [dispatch]);
    return { user, login, register, loginOut };
};
