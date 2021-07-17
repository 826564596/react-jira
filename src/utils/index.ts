import { useEffect, useRef, useState } from "react";
/**各个工具函数和一些简单hook */

export const isFalsy = (value: unknown): boolean => {
    return value === 0 ? false : !value;
};

export const isVoid = (value: unknown) => {
    return value === undefined || value === null || value === "";
};

export const clearObject = (object?: { [key: string]: unknown }) => {
    if (!object) {
        return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((item: string) => {
        const value = result[item];
        if (isVoid(value)) {
            delete result[item];
        }
    });
    return result;
};
/**初始化 */
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
/**防抖函数 */
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        //每次在value变化后设置一个定时器
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        //每次在上一个useEffect处理完后再运行
        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return debounceValue;
};
/**数组的管理 */
export const useArray = <T>(array: T[]) => {
    const [value, setValue] = useState(array);
    /**清空数组 */
    const clear = () => {
        setValue(new Array<T>());
    };
    /**添加一项 */
    const add = (item: T) => {
        setValue([...value, item]);
    };
    /**下标删除一项 */
    const removeIndex = (index: number) => {
        setValue(value.filter((item, idx) => index !== idx));
    };
    return { value, clear, removeIndex, add };
};

/**
 * 操作页面的title
 * @param title 文档的title
 * @param keepOnUnMount 是否保持当前页面的title,true时保留当前标题，false 还原标题
 */
export const useDocumentTitle = (title: string, keepOnUnMount: boolean = true) => {
    const oldTitle = useRef(document.title).current;
    //更新
    useEffect(() => {
        document.title = title;
    }, [title]);
    //卸载
    useEffect(() => {
        return () => {
            if (!keepOnUnMount) {
                document.title = oldTitle;
            }
        };
    }, [keepOnUnMount, oldTitle]);
};
/**重置路由到根路由 */
export const resetRoute = () => {
    window.location.href = window.location.origin;
};

/**
 * 用来返回的挂载状态，如果还没挂载或者已经卸载，返回false;反之返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });
    return mountedRef;
};
