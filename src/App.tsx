import { useAuth } from "context/authContext";
import React from "react";
import UnauthenticatedApp from "unauthenticatedApp";
import AuthenticatedApp from "authenticatedApp";
import "./App.css";
import { ErrorBoundary } from "components/errorBoundaries";
import { FullPageErrorFallBack } from "components/lib";

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            {/* {user ? <AuthenticatedApp /> : <UnauthenticatedApp />} */}
            {/**ErrorBoundary为错误边界*/}
            <ErrorBoundary fallbackRender={FullPageErrorFallBack}>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</ErrorBoundary>
        </div>
    );
}

export default App;
