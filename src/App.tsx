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
import CompanyList from "./pages/Company/List"
import CreateCompany from './pages/Company/Create';
import EditCompany from './pages/Company/Edit';
import TasksList from './pages/Tasks/TasksList';
import TasksCreatePage from './pages/Tasks/TasksCreatePage';
import TasksEditPage from './pages/Tasks/TasksEditPage';
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
                            <Route path='/companies'>
                                <Route path="/companies" element={<CompanyList />}  />
                                <Route path="create" element={<CreateCompany />}  />
                                <Route path="edit/:id" element={<EditCompany />}  />
                            </Route>
                            <Route path='/tasks' element={<TasksList>
                                <Outlet/>  
                            </TasksList>}>
                                <Route path="new" element={<TasksCreatePage/>}/>
                                <Route path="edit/:id" element={<TasksEditPage/>}/>
                            <Route/>
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
