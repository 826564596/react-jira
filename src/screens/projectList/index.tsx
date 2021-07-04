import React from "react";
import SearchPanel from "./searchPanel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useUsers } from "utils/useUsers";
import { useProjects } from "utils/useProjects";
import { useProjectSearchParams } from "./utils";
import { Row } from "components/lib";
function ProjectListScreen(props: { projectButton: JSX.Element }) {
    useDocumentTitle("项目列表", false);
    const [param, setParam] = useProjectSearchParams();
    const debounceParam = useDebounce(param, 2000);
    const { isLoading, error, data: list, retry } = useProjects(debounceParam);
    const { data: users } = useUsers();
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                {props.projectButton}
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users || []} />
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
            <List projectButton={props.projectButton} refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    );
}
export default ProjectListScreen;
//使用why-did-you-render对页面进行错误跟踪
ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
    padding: 3.2rem;
`;
