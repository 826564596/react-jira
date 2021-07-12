import React from "react";
import SearchPanel from "./searchPanel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useUsers } from "utils/useUsers";
import { useProjects } from "utils/useProjects";
import { useProjectModal, useProjectSearchParams } from "./utils";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
function ProjectListScreen() {
    useDocumentTitle("项目列表", false);
    const [param, setParam] = useProjectSearchParams();
    const { open } = useProjectModal();
    const debounceParam = useDebounce(param, 2000);
    const { isLoading, error, data: list } = useProjects(debounceParam);

    const { data: users } = useUsers();
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding type={"link"} onClick={() => open()}>
                    创建项目
                </ButtonNoPadding>
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users || []} />
            <ErrorBox error={error} />
            <List loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    );
}
export default ProjectListScreen;
//使用why-did-you-render对页面进行错误跟踪
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
    padding: 3.2rem;
`;
