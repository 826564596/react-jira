import React, { ReactNode } from "react";
import { AuthProvider } from "context/authContext";
export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>;
};
