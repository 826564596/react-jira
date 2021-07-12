import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

/** 获取token*/
export const getToken = () => {
    return window.localStorage.getItem(localStorageKey);
};
/**将token存入localStorage */
export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "");
    return user;
};

export const login = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
};

export const register = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
};

/**登录 */
// export const login = (data: { username: string; password: string }) => {
//     return axios.post(`/login`, { ...data }).then((res) => {
//         if (res.status === 200) {
//             return handleUserResponse(res.data.user);
//         } else {
//             return Promise.reject(data);
//         }
//     });
// };
/**注册 */
// export const register = (data: { username: string; password: string }) => {
//     return axios.post(`/register`, { ...data }).then((res) => {
//         if (res.status === 200) {
//             return handleUserResponse(res.data.user);
//         } else {
//             return Promise.reject(data);
//         }
//     });
// };
/**登出 */
export const loginOut = async () => window.localStorage.removeItem(localStorageKey);
