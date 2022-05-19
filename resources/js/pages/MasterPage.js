import { Button, Grid, Paper } from "@mui/material";
import { useStoreRehydrated } from "easy-peasy";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

function MasterPage() {
    const rehydrated = useStoreRehydrated();
    const [records, setRecords] = useState();
    const [teams, setTeams] = useState({});
    const [departments, setDepartments] = useState({});
    const [shiftSchedules, setShiftSchedules] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (rehydrated) {
            axios.get("list/attendance").then(async ({ data }) => {
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
                    setRecords(
                        data.map((d) => ({
                            ...d,
                            department_id: d?.employee?.department?.id,
                            team_id: d?.employee?.team?.id,
                            shift_id: d?.employee?.shift_schedule?.id,
                            employee_name:
                                d?.employee.first_name +
                                " " +
                                d?.employee.last_name,
                        }))
                    );
                }
                setIsLoading(false);
            });
        }
    }, [rehydrated]);

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Button
                onClick={() => {
                    axios.get("attendance/export").then((resp) => {
                        const rows = resp.data;
                        let csvContent =
                            "data:text/csv;charset=utf-8," +
                            rows.map((e) => e.join(",")).join("\n");
                        var encodedUri = encodeURI(csvContent);
                        window.open(encodedUri);
                    });
                }}
            >
                Export
            </Button>
            <MaterialTable
                title="Employee Reports"
                data={records}
                isLoading={isLoading}
                options={{
                    filtering: true,
                    pageSize: 10,
                }}
                columns={[
                    {
                        title: "Department",
                        field: "department_id",
                        lookup: departments,
                    },
                    {
                        title: "Employee Name",
                        field: "employee_name",
                    },

                    {
                        title: "Shift Schedule",
                        field: "shift_id",
                        lookup: shiftSchedules,
                    },
                    {
                        title: "Team",
                        field: "team_id",
                        lookup: teams,
                    },
                    {
                        title: "Work Type",
                        field: "is_onsite",
                        render: ({ is_onsite }) =>
                            is_onsite ? "Onsite" : "WFH",
                    },
                    {
                        title: "Remarks",
                        field: "remarks",
                    },
                    {
                        title: "Location",
                        field: "location",
                    },
                ]}
            />
        </Grid>
    );
}

export default MasterPage;
