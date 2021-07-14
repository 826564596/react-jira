import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/projectList/utils";
import { useProjects } from "utils/useProjects";
import { ButtonNoPadding } from "./lib";
export const ProjectPopover = () => {
    const { data: projects, refetch } = useProjects();

    const { open } = useProjectModal();
    const pinnedProjects = projects?.filter((project) => project.pin);
    const content = (
        <ContentContainer>
            <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((project) => {
                    return (
                        <List.Item key={project.id}>
                            <List.Item.Meta title={project.name} />
                        </List.Item>
                    );
                })}
            </List>
            <Divider />
            <ButtonNoPadding type={"link"} onClick={() => open()}>
                编辑
            </ButtonNoPadding>
        </ContentContainer>
    );
    return (
        <Popover onVisibleChange={() => refetch()} placement={"bottom"} content={content}>
            <span>项目</span>
        </Popover>
    );
};

const ContentContainer = styled.div`
    min-width: 30rem;
`;
