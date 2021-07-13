import styled from "@emotion/styled";
import { Menu } from "antd";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";
const useRouteType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1];
};
export const ProjectScreen = () => {
    const routerType = useRouteType();
    return (
        <Container>
            <Aside>
                <Menu mode={"inline"} selectedKeys={[routerType]}>
                    <Menu.Item key={"kanban"}>
                        <Link to={"kanban"}>看板</Link>
                    </Menu.Item>
                    <Menu.Item key={"epic"}>
                        <Link to={"epic"}>任务组</Link>
                    </Menu.Item>
                </Menu>
            </Aside>

            <Main>
                <Routes>
                    <Route path={"/kanban"} element={<KanbanScreen />} />
                    <Route path={"/epic"} element={<EpicScreen />} />
                    <Navigate to={window.location.pathname + "/kanban"} replace={true} />
                </Routes>
            </Main>
        </Container>
    );
};
ProjectScreen.whyDidYouRender = true;
const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;
`;

const Main = styled.div`
    display: flex;
    overflow: hidden;
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
    display: grid;
    overflow: hidden;
    grid-template-columns: 16rem 1fr;
`;
