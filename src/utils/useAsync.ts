import { useState } from "react";
import { useMountedRef } from "utils";

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
    const mountedRef = useMountedRef();
    //useState保存函数不能直接传入函数，直接传入函数的意义：惰性初始化会立即执行该函数,并把返回值传给retry
    //setRetry时也会执行函数并返回所以也要加一层层
    const [retry, setRetry] = useState(() => () => {});
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
    /**
     * 传入异步请求可以是useHttp里的请求，用来触发异步请求，并返回相关的请求信息,将相关信息赋值给state
     * @param promise 异步请求后的promise
     * @param runConfig run函数的配置参数
     * @returns 返回一个promise
     */
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error("请传入 promise 类型数据");
        }
        //将每次的promise缓存起来
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig);
            }
        });
        setState({
            ...state,
            stat: "loading",
        });
        return promise
            .then((data) => {
                //如果组件挂载完成
                if (mountedRef.current) setData(data);
                return data;
            })
            .catch((error) => {
                //catch会自动消化异常，如果不主动抛出异常，外面的catch是捕获不到异常的
                setError(error);
                if (config.throwOnError) return Promise.reject(error);
                return error;
            });
    };
    /**刷新接口 重新执行run 刷新state*/
    // const retry = () => {};

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        retry,
        ...state,
    };
};
