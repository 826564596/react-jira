import { useState } from "react";

interface State<D> {
    error: Error | null;
    data: D | null;
    /**idle：未发生，loading：进行中，error：失败，success：成功 */
    stat: "idle" | "loading" | "error" | "success";
}
//默认初值
const defaultInitialState: State<null> = {
    stat: "idle",
    data: null,
    error: null,
};
const defaultConfig = {
    throwOnError: false, //用于判断是否需要主动抛出异常
};

/**
 * 用于数据的异步请求
 * @param initialState
 * @param initialConfig 初始化的配置项
 * @returns
 */
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState,
    });
    /**成功 */
    const setData = (data: D) => {
        setState({
            data: data,
            stat: "success",
            error: null,
        });
    };
    /**失败 */
    const setError = (error: Error) => {
        setState({
            error: error,
            stat: "error",
            data: null,
        });
    };
    /**传入异步请求可以是useHttp里的请求，用来触发异步请求，并返回相关的请求信息*/
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error("请传入 promise 类型数据");
        }
        setState({
            ...state,
            stat: "loading",
        });
        return promise
            .then((data) => {
                setData(data);
                return data;
            })
            .catch((error) => {
                //catch会自动消化异常，如果不主动抛出异常，外面的catch是捕获不到异常的
                setError(error);
                if (config.throwOnError) return Promise.reject(error);
                return error;
            });
    };
    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        ...state,
    };
};
