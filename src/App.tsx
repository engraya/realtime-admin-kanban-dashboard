import { 
    Refine,
    WelcomePage,
    Authenticated, 
} from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage,ErrorComponent
,useNotificationProvider} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import { liveProvider, dataProvider } from './providers';
import { App as AntdApp } from "antd"
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { authProvider } from './providers';
import { Home, ForgotPassword, Login, Register } from './pages';
import Layout from './components/Layout/Layout';
import { resources } from './config/Resources';




function App() {
    
    
    return (
        <BrowserRouter>
          <ColorModeContextProvider>
        <RefineKbarProvider>
            <AntdApp>
                <Refine dataProvider={dataProvider}
                        liveProvider={liveProvider}
                        notificationProvider={useNotificationProvider}
                        routerProvider={routerBindings}
                        authProvider={authProvider} 
                        resources={resources}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                                projectId: "AG0b5X-hRvR6w-PJHoHQ",
                            liveMode: "auto",
                        }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    key="authenticated-inner"
                                    fallback={<CatchAllNavigate to="/login" />}
                                >

                                        <Layout>
                                        <Outlet />
                                        </Layout>
                                </Authenticated>
                            }
                        >

                            <Route index element={<Home />}  />
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                        <Route element={ <Authenticated key="authenticated-outer" fallback={<Outlet />}> <NavigateToResource /></Authenticated>}>
                            <Route index element={<WelcomePage />}  />
                            <Route index element={<Home />}  />
                            <Route path="/login" element={<Login />}  />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                        </Route>
                    </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </AntdApp>
        </RefineKbarProvider>
        </ColorModeContextProvider>
        </BrowserRouter>
      );
};

export default App;
