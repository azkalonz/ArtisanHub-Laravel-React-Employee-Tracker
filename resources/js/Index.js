import { StoreProvider } from "easy-peasy";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RoleRoute from "./components/RoleRoute";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import MasterPage from "./pages/MasterPage";
import Teams from "./pages/Teams";
import store from "./redux/store";

function Index() {
    return (
        <StoreProvider store={store}>
            <SnackbarProvider maxSnack={3}>
                <BrowserRouter>
                    <Switch>
                        <Route component={Login} path="/login" />
                        <RoleRoute
                            role="admin"
                            component={MasterPage}
                            path="/master"
                        />
                        <RoleRoute
                            role="admin"
                            component={Employees}
                            path="/employees"
                        />
                        <RoleRoute
                            role="admin"
                            component={Departments}
                            path="/departments"
                        />
                        <RoleRoute
                            role="admin"
                            component={Teams}
                            path="/teams"
                        />
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
        </StoreProvider>
    );
}

export default Index;

ReactDOM.render(<Index />, document.getElementById("app"));
