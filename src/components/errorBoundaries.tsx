import React from "react";
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
/**捕获错误边界 主要用于捕获未知错误*/
//React.Component接收两个参数类型第一个是props的类型，第二个是state的类型
// props类型：PropsWithChildren默认会加上Children:ReactNode
// React.PropsWithChildren<{ fallBackRender: FallBackRender }> 就等于 { children:ReactNode,fallBackRender:FallBackRender }
// state类型:
// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    state = { error: null };
    //当子组件抛出异常，这里会接收到并调用
    static getDerivedStateFromError(error: Error) {
        return { error };
    }
    render() {
        const { error } = this.state;
        const { fallbackRender, children } = this.props;
        //错误的时候渲染
        if (error) {
            return fallbackRender({ error });
        }
        //正常渲染
        return children;
    }
}
