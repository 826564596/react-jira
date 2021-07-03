import qs from "qs";
// import axios from "axios";
import { loginOut } from "authProvider";
import { useAuth } from "context/authContext";
import { useCallback } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
// // http request 响应器
// axios.interceptors.request.use((config) => {
//     console.log(config);
//     config.url = apiUrl! + config.url;
//     if (getToken()) config.headers.Authorization = "bearer " + getToken();
//     return config;
// });
// //http request 拦截器
// axios.interceptors.response.use((response) => {
//     return response;
// });

// export default axios;

interface Config extends RequestInit {
    token?: string;
    data?: object;
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    };
    //判断get方法将data拼入endpoint
    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
        //如果未认证
        if (response.status === 401) {
            await loginOut();
            window.location.reload();
            return Promise.reject({ message: "请重新登录" });
        }

        //如果成功
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
};
/**使用fetch对请求进行封装 */
export const useHttp = () => {
    const { user } = useAuth();
    return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }), [user?.token]);
};
