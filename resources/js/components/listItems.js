import {
    Bedtime,
    CalendarMonth,
    Dashboard,
    EventNote,
    GroupAdd,
    LocalAtm,
    Logout,
    People,
    Warning,
    Workspaces,
} from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { useHistory } from "react-router-dom";

export const MainListItems = () => {
    const history = useHistory();

    return (
        <React.Fragment>
            <ListItemButton onClick={() => history.push("/master")}>
                <ListItemIcon>
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => history.push("/employees")}>
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                <ListItemText primary="Employees" />
            </ListItemButton>
            <ListItemButton onClick={() => history.push("/departments")}>
                <ListItemIcon>
                    <Workspaces />
                </ListItemIcon>
                <ListItemText primary="Departments" />
            </ListItemButton>
            <ListItemButton onClick={() => history.push("/teams")}>
                <ListItemIcon>
                    <GroupAdd />
                </ListItemIcon>
                <ListItemText primary="Teams" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <CalendarMonth />
                </ListItemIcon>
                <ListItemText primary="Shift Schedules" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <EventNote />
                </ListItemIcon>
                <ListItemText primary="Hybrid Schedules" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <Warning />
                </ListItemIcon>
                <ListItemText primary="Hazard Pay" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <LocalAtm />
                </ListItemIcon>
                <ListItemText primary="Attendance Bonus" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <Bedtime />
                </ListItemIcon>
                <ListItemText primary="PTO" />
            </ListItemButton>
        </React.Fragment>
    );
};

export const SecondaryListItems = () => {
    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                Account
            </ListSubheader>
            <ListItemButton>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </React.Fragment>
    );
};
