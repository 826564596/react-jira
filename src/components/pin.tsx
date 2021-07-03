import { Rate } from "antd";
import React from "react";
interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean; //选中状态
    onCheckedChange?: (checked: boolean) => void; //切换选中状态函数
}
/**封装antd rate */
export const Pin = (props: PinProps) => {
    const { checked, onCheckedChange, ...restProps } = props; //让Pin组件具备透传功能
    return <Rate count={1} value={checked ? 1 : 0} onChange={(num) => onCheckedChange?.(Boolean(num) ? true : false)} {...restProps}></Rate>;
};
