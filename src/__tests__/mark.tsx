import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("Mark 组件争取高亮关键词", () => {
    const name = "无聊管理";
    const keyWord = "管理";
    render(<Mark name={name} keyWord={keyWord} />);
    expect(screen.getByText(keyWord)).toBeInTheDocument();
    expect(screen.getByText(keyWord)).toHaveStyle("color:#257AFD");
    expect(screen.getByText("无聊")).not.toHaveStyle("color:#257AFD");
});
