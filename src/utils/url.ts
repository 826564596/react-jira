import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { clearObject } from "utils";

/**返回页面的url 指定键的参数值 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return [
        //使用useMemo将reduce第一次返回的对象缓存起来，让useEffect更新时的依赖不变，否则会无限循环
        useMemo(() => {
            //返回一个对象
            //表示返回的类型是{ 'string' : 'string'}的键值对
            return keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || "" };
            }, {} as { [key in T]: string });
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchParams]),
        (params: Partial<{ [key in T]: unknown }>) => {
            //Object.fromEntries 把键值对列表转换成对象
            const o = clearObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
            //通过input输入参数 将参数更新到url里
            return setSearchParams(o);
        },
    ] as const; //返回tuple类型，里面的子类型不一样的时候要使用as const
};
