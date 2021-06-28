import { useAuth } from "context/authContext";
import React from "react";
import ProjectListScreen from "screens/projectList";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
/**登录成功页面 */
const AuthenticatedApp = () => {
    const { loginOut, user } = useAuth();
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
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
            <Nav>nav</Nav>
            <Main>
                <ProjectListScreen />
            </Main>
            <Aside>aside</Aside>
            <Footer>footer</Footer>
        </Container>
    );
};
export default AuthenticatedApp;

// const PageHeader = styled.header`
//     height: 6rem;
//     border: 1px red solid;
// `;

// const Main = styled.main`
//     height: calc(100vh - 6rem);
// `;

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem; /**高 */
    grid-template-columns: 20rem 1fr 20rem; /**宽 */
    grid-template-areas: /**布局的样式组成 */
        "header header header"
        "nav main aside"
        "footer footer footer";
    height: 100vh;
    grid-gap: 2rem; /**每个模块间的距离 */
`;

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
const Nav = styled.nav`
    grid-area: nav;
`;
const Aside = styled.aside`
    grid-area: aside;
`;
const Footer = styled.footer`
    grid-area: footer;
`;
