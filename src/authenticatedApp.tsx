import { useAuth } from "context/authContext";
import React from "react";
import ProjectListScreen from "screens/projectList";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Routes, Navigate, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
/**登录成功页面 */
const AuthenticatedApp = () => {
    return (
        <Container>
            <PageHeader />
            <Main>
                <Router>
                    <Routes>
                        <Route path={"/projects"} element={<ProjectListScreen />} />
                        <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
                        {/* 默认路由 */}
                        <Navigate to={"/projects"} />
                    </Routes>
                </Router>
            </Main>
        </Container>
    );
};
export default AuthenticatedApp;
/**公共的Header*/
const PageHeader = () => {
    const { loginOut, user } = useAuth();
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <Button type={"link"} onClick={() => resetRoute()}>
                    <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
                </Button>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <Button type={"link"} onClick={loginOut}>
                                    登出
                                </Button>
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button type={"link"} onClick={(e) => e.preventDefault()}>
                        Hi,{user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    );
};

const Container = styled.div`
    height: 100vh;
`;

// const Container = styled.div`
//     display: grid;
//     grid-template-rows: 6rem 1fr 6rem; /**高 */
//     grid-template-columns: 20rem 1fr 20rem; /**宽 */
//     grid-gap: 2rem; /**每个模块间的距离 */
//     grid-template-areas: /**布局的样式组成 */
//         "header header header"
//         "nav main aside"
//         "footer footer footer";
//     height: 100vh;
// `;

const Header = styled(Row)`
    grid-area: header;
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
    grid-area: main;
`;
// const Nav = styled.nav`
//     grid-area: nav;
// `;
// const Aside = styled.aside`
//     grid-area: aside;
// `;
// const Footer = styled.footer`
//     grid-area: footer;
// `;
