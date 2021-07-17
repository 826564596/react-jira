import { renderHook } from "@testing-library/react-hooks";
import { useAsync } from "utils/useAsync";

const defaultState: ReturnType<typeof useAsync> = {
    stat: "idle",
    data: null,
    error: null,
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    run: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
    retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
    ...defaultState,
    stat: "loading",
    isIdle: false,
    isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
    ...defaultState,
    stat: "success",
    isIdle: false,
    isSuccess: true,
};

// test("useAsync 异步处理", async () => {
//     let resolve: any, reject: any;
//     const promise = new Promise((res, rej) => {
//         resolve = res;
//         reject = rej;
//     });

//     const { result } = renderHook(() => useAsync());
//     expect(result.current).toEqual(defaultState);
// });
