import { StoreProvider } from "easy-peasy";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RoleRoute from "./components/RoleRoute";
import AttendanceBonus from "./pages/AttendanceBonus";
import Departments from "./pages/Departments";
import EmployeeRecords from "./pages/EmployeeRecords";
import Employees from "./pages/Employees";
import HazardPays from "./pages/HazardPays";
import HybridSchedules from "./pages/HybridSchedules";
import Login from "./pages/Login";
import MasterPage from "./pages/MasterPage";
import PtoInfo from "./pages/PtoInfo";
import RecordAttendance from "./pages/RecordAttendance";
import ShiftSchedules from "./pages/ShiftSchedules";
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
                        <RoleRoute
                            role="admin"
                            component={ShiftSchedules}
                            path="/shifts"
                        />
                        <RoleRoute
                            role="admin"
                            component={HybridSchedules}
                            path="/hybrid"
                        />
                        <RoleRoute
                            role="admin"
                            component={HazardPays}
                            path="/hazard"
                        />
                        <RoleRoute
                            role="admin"
                            component={AttendanceBonus}
                            path="/attendance-bonus"
                        />
                        <RoleRoute
                            role="admin"
                            component={PtoInfo}
                            path="/pto"
                        />

                        <RoleRoute
                            role="team lead"
                            component={RecordAttendance}
                            path="/lead"
                        />

                        <RoleRoute
                            role="employee"
                            component={EmployeeRecords}
                            path="/employee"
                        />
                        <Route component={Login} path="/" />
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
        </StoreProvider>
    );
}

export default Index;

ReactDOM.render(<Index />, document.getElementById("app"));
