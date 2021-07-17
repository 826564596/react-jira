import React from "react";
import "./App.css";
import { useAuth } from "context/authContext";

import { ErrorBoundary } from "components/errorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

// import AuthenticatedApp from "authenticatedApp";
// import UnauthenticatedApp from "unauthenticatedApp";

const AuthenticatedApp = React.lazy(() => import("authenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticatedApp"));

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                <React.Suspense fallback={<FullPageLoading />}>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</React.Suspense>
            </ErrorBoundary>
        </div>
    );
}

export default App;
