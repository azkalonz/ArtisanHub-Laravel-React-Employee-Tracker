import { Grid, Paper } from "@mui/material";
import { useStoreRehydrated } from "easy-peasy";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

function MasterPage() {
    const rehydrated = useStoreRehydrated();
    const [employees, setEmployees] = useState();
    const [teams, setTeams] = useState({});
    const [departments, setDepartments] = useState({});
    const [shiftSchedules, setShiftSchedules] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (rehydrated) {
            axios.get("list/employees").then(async ({ data }) => {
                const dep = await axios.get("list/departments");
                const team = await axios.get("list/teams");
                const sched = await axios.get("list/shift-schedules");
                const s = {};
                const d = {};
                const t = {};
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
                        s[dd.id] = dd.from + " " + dd.to + " " + dd.description;
                    });
                }
                setTeams(t);
                setDepartments(d);
                setShiftSchedules(s);
                if (data) {
                    setEmployees(data);
                }
                setIsLoading(false);
            });
        }
    }, [rehydrated]);

    return (
        <Grid item xs={12} md={12} lg={12}>
            <MaterialTable
                title="Employee Shifts"
                data={employees}
                isLoading={isLoading}
                editable={true}
                columns={[
                    {
                        title: "Department",
                        field: "department_id",
                        lookup: departments,
                    },
                    {
                        title: "Employee",
                        field: "first_name",
                        render: ({ first_name, last_name }) =>
                            first_name + " " + last_name,
                    },
                    {
                        title: "Shift Schedule",
                        field: "shift_schedule_id",
                        lookup: shiftSchedules,
                    },
                    {
                        title: "Team",
                        field: "team_id",
                        lookup: teams,
                    },
                    {
                        title: "Work Type",
                    },
                ]}
            />
        </Grid>
    );
}

export default MasterPage;
