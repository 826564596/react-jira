import React, { useState } from "react";
import SearchPanel from "./SearchPanel";
import List from "./List";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useUsers } from "utils/useUsers";
import { useProjects } from "utils/useProjects";
function ProjectListScreen() {
    const [param, setParam] = useState({
        name: "",
        personId: "",
    });

    const debounceParam = useDebounce(param, 2000);
    const { isLoading, error, data: list } = useProjects(debounceParam);
    const { data: users } = useUsers();

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users || []} />
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
            <List loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    );
}
export default ProjectListScreen;

const Container = styled.div`
    padding: 3.2rem;
`;
