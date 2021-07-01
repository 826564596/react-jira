import React from "react";
import { useUsers } from "utils/useUsers";
import { IdSelect } from "./idSelect";
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: users } = useUsers();
    return <IdSelect options={users || []} {...props} />;
};
