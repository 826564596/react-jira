import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import Raect from "react";
export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => props.marginBottom + "rem"};
    justify-content: ${(props) => (props.between ? "space-between" : undefined)};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${(props) => (typeof props.gap === "number" ? props.gap + "rem" : props.gap ? "2rem" : undefined)};
    }
`;
/**全屏的加载中组件*/
export const FullPageLoading = () => {
    return (
        <FullPage>
            <Spin size={"large"} />
        </FullPage>
    );
};
export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => {
    return (
        <FullPage>
            <DevTools />
            <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
        </FullPage>
    );
};
const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
