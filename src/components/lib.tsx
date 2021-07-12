import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
/**
 *
 */
export const Row = styled.div<{
    gap?: number | boolean; //
    between?: boolean; //是否是 justify-content:between
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
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
    return (
        <FullPage>
            <DevTools />
            <ErrorBox error={error} />
        </FullPage>
    );
};

//类型守卫，表示如果有message值,将value值类型设置为Error类型
const isError = (value: any): value is Error => value?.massage;
/**过滤掉非Error类型的error */
export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
    }
    return null;
};

export const ButtonNoPadding = styled(Button)`
    padding: 0;
`;
export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
