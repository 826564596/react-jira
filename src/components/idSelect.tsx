import { Select } from "antd";
import React from "react";
import { Raw } from "types";

// 将原来的的Select中的所有属性提取出来和自定义组件的参数类型idSelectProps合并
type SelectProps = React.ComponentProps<typeof Select>;
interface idSelectProps extends Omit<SelectProps, "value" | "onChange" | "defaultOptionName" | "options"> {
    value: Raw | null | undefined;
    onChange: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string; id: number }[];
}
/**
 * value 可以传入多种类型的值
 * onChange只会回调 number| undefined 类型的值
 * 当isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 */
export const idSelect = (props: idSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props;
    return (
        <Select
            value={toNumber(value)}
            onChange={(value) => {
                return onChange(toNumber(value) || undefined);
            }}
            {...restProps} //将Select中原先所有props封装到该组件里
        >
            {/* 默认项第一项 */}
            {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
            {options?.map((option) => {
                return (
                    <Select.Option key={option.id} value={option.id}>
                        {option.name}
                    </Select.Option>
                );
            })}
        </Select>
    );
};
/**判断是否能将value转成数字 如果可以返回转换后的数字否则返回0 */
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
