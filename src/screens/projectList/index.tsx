import React, { useState, useEffect } from "react";
import SearchPanel from "./SearchPanel";
import List from "./List";
import { useHttp } from "utils/http";
import { clearObject, useMount, useDebounce } from "../../utils";
import styled from "@emotion/styled";

function ProjectListScreen() {
    const [param, setParam] = useState({
        name: "",
        personId: "",
    });
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const client = useHttp();
    //didMount
    useMount(() => {
        client(`users`).then((res) => {
            setUsers(res);
        });
    });
    const debounceParam = useDebounce(param, 2000);
    //didUpdate
    useEffect(() => {
        client(`projects`, { data: clearObject(debounceParam) }).then((res) => {
            setList(res);
        });
    }, [debounceParam]);
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </Container>
    );
}
export default ProjectListScreen;

const Container = styled.div`
    padding: 3.2rem;
`;
