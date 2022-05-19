import {
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Input,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import { useStoreRehydrated } from "easy-peasy";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";

function Employees() {
    const rehydrated = useStoreRehydrated();
    const [employees, setEmployees] = useState();
    const [teams, setTeams] = useState({});
    const [departments, setDepartments] = useState({});
    const [shiftSchedules, setShiftSchedules] = useState({});
    const [hybridSchedules, setHybridSchedules] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const saveEmployee = useCallback(() => {
        if (!!!selectedEmployee) return;
        setIsSaving(true);
        axios
            .post("update/employee/" + selectedEmployee.id, selectedEmployee)
            .then(({ data }) => {
                if (data?.id) {
                    const s = [...employees];
                    const index = s.findIndex((q) => q.id === data.id);
                    if (index >= 0) {
                        s[index] = data;
                    } else {
                        s.unshift(data);
                    }
                    setEmployees(s);
                }
                setIsSaving(false);
            })
            .catch(() => {
                enqueueSnackbar("Duplicate/Invalid Email", {
                    type: "warning",
                });
                setIsSaving(false);
            });
    }, [selectedEmployee, employees]);

    const deleteEmployee = useCallback(() => {
        if (!selectedEmployee?.id) return;
        setIsSaving(true);
        axios
            .delete("delete/employee/" + selectedEmployee.id)
            .then(({ data }) => {
                if (data) {
                    const s = [...employees];
                    const index = s.findIndex(
                        (q) => q.id === selectedEmployee.id
                    );
                    if (index >= 0) {
                        s.splice(index, 1);
                    }
                    enqueueSnackbar("Successfully deleted employee", {
                        type: "success",
                    });
                    setEmployees(s);
                    setSelectedEmployee(null);
                } else
                    enqueueSnackbar("Can't delete employee", {
                        type: "warning",
                    });
                setIsSaving(false);
            });
    }, [selectedEmployee, employees]);

    const setEmployeeState = (id, val) => {
        if (!selectedEmployee) return;
        const e = { ...selectedEmployee };
        e[id] = val;
        setSelectedEmployee(e);
    };

    useEffect(() => {
        if (rehydrated) {
            axios.get("list/employees").then(async ({ data }) => {
                const dep = await axios.get("list/departments");
                const team = await axios.get("list/teams");
                const sched = await axios.get("list/shift-schedules");
                const hybrid = await axios.get("list/hybrid-schedules");
                const s = {};
                const d = {};
                const t = {};
                const h = {};
                if (dep?.data) {
                    dep.data.forEach((dd) => {
                        d[dd.id] = dd.name;
                    });
                }
                if (team?.data) {
                    team.data.forEach((dd) => {
                        t[dd.id] = dd.name;
                    });
                }
                if (sched?.data) {
                    sched.data.forEach((dd) => {
                        s[dd.id] = dd.from + " - " + dd.to;
                    });
                }
                if (hybrid?.data) {
                    hybrid.data.forEach((dd) => {
                        h[dd.id] = dd.name;
                    });
                }
                setTeams(t);
                setDepartments(d);
                setShiftSchedules(s);
                setHybridSchedules(h);
                if (data) {
                    setEmployees(data);
                }
                setIsLoading(false);
            });
        }
    }, [rehydrated]);

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Button
                onClick={() => {
                    setSelectedEmployee({ id: -1 });
                }}
            >
                Add Employee
            </Button>
            <Dialog
                open={!!selectedEmployee}
                onClose={() => setSelectedEmployee(null)}
            >
                <DialogTitle>
                    {selectedEmployee?.id > 0
                        ? "Update Employee"
                        : "Add Employee"}
                </DialogTitle>
                <DialogContent style={{ minWidth: 490 }}>
                    {isSaving && <CircularProgress />}
                    {!isSaving && (
                        <>
                            <Typography variant="caption">Employee</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Employee ID" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "employee_id",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.employee_id
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Email" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedEmployee?.email}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Team" />
                                    <Select
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "team_id",
                                                e.target.value
                                            )
                                        }
                                        defaultValue={selectedEmployee?.team_id}
                                    >
                                        {Object.keys(teams).map((id) => (
                                            <MenuItem key={id} value={id}>
                                                {teams[id]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Shift Schedule" />
                                    <Select
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "shift_schedule_id",
                                                e.target.value
                                            )
                                        }
                                        defaultValue={
                                            selectedEmployee?.shift_schedule_id
                                        }
                                    >
                                        {Object.keys(shiftSchedules).map(
                                            (id) => (
                                                <MenuItem key={id} value={id}>
                                                    {shiftSchedules[id]}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Hybrid Schedule" />
                                    <Select
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "hybrid_schedule_id",
                                                e.target.value
                                            )
                                        }
                                        defaultValue={
                                            selectedEmployee?.hybrid_schedule_id
                                        }
                                    >
                                        {Object.keys(hybridSchedules).map(
                                            (id) => (
                                                <MenuItem key={id} value={id}>
                                                    {hybridSchedules[id]}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Department" />
                                    <Select
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "department_id",
                                                e.target.value
                                            )
                                        }
                                        defaultValue={
                                            selectedEmployee?.department_id
                                        }
                                    >
                                        {Object.keys(departments).map((id) => (
                                            <MenuItem key={id} value={id}>
                                                {departments[id]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Attendance Bonus" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "attendance_bonus",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.attendance_bonus ||
                                            0
                                        }
                                        type="number"
                                    />
                                </ListItem>
                            </List>
                            <Typography variant="caption">Personal</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="First Name" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.first_name
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Middle Name" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "middle_name",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.middle_name
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Last Name" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "last_name",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.last_name
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Birthdate" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "birthdate",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.birthdate
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Gender" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedEmployee?.gender}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Civil Status" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "status",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedEmployee?.status}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Address" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedEmployee?.address}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Mobile Number" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "mobile_number",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.mobile_number
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Designation" />
                                    <Input
                                        onChange={(e) =>
                                            setEmployeeState(
                                                "designation",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedEmployee?.designation
                                        }
                                    />
                                </ListItem>
                            </List>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button onClick={() => setSelectedEmployee(null)}>
                            Cancel
                        </Button>
                        {selectedEmployee?.id > 0 && (
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={deleteEmployee}
                            >
                                Delete
                            </Button>
                        )}
                        <Button variant="contained" onClick={saveEmployee}>
                            Save
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
            <MaterialTable
                title="Employees"
                data={employees}
                isLoading={isLoading}
                options={{
                    filtering: true,
                }}
                onRowClick={(e, data) => {
                    setSelectedEmployee(data);
                }}
                columns={[
                    {
                        title: "Employee ID",
                        field: "employee_id",
                    },
                    {
                        title: "Department",
                        field: "department_id",
                        lookup: departments,
                    },
                    {
                        title: "First Name",
                        field: "first_name",
                    },
                    {
                        title: "Last Name",
                        field: "last_name",
                    },
                    {
                        title: "Shift Schedule",
                        field: "shift_schedule_id",
                        lookup: shiftSchedules,
                    },
                    {
                        title: "Hybrid Schedule",
                        field: "hybrid_schedule_id",
                        lookup: hybridSchedules,
                    },
                    {
                        title: "Team",
                        field: "team_id",
                        lookup: teams,
                    },
                ]}
            />
        </Grid>
    );
}

export default Employees;
