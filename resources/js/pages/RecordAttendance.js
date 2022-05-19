import { Button, Icon, List, ListItemText, Typography } from "@mui/material";
import { useStoreRehydrated, useStoreState } from "easy-peasy";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "../utils/axios";

function RecordAttendance() {
    const [hasRecorded, setHasRecorded] = useState();
    const rehydrated = useStoreRehydrated();
    const { enqueueSnackbar } = useSnackbar();
    const [employees, setEmployees] = useState();
    const { userInfo } = useStoreState((states) => states.user);
    const refs = useRef({});

    const submitAttendance = useCallback(() => {
        axios
            .post("attendance/record-submission", {
                employees: Object.keys(refs.current).map(
                    (k) => refs.current[k]
                ),
            })
            .then(({ data }) => {
                if (!!data) {
                    window.location.reload();
                }
            })
            .catch(() => {
                enqueueSnackbar("Something went wrong!", {
                    type: "warning",
                });
            });
    }, [refs]);

    useEffect(() => {
        if (rehydrated && userInfo?.user) {
            axios.get("attendance/check-submission").then((resp) => {
                if (resp.data?.id) {
                    setHasRecorded(resp.data);
                } else {
                    axios
                        .get(
                            "list/employees?team_id_filter=" +
                                userInfo.user.team_id
                        )
                        .then((resp) => {
                            if (resp.data) {
                                setEmployees(resp.data);
                                resp.data.forEach((emp) => {
                                    refs.current[emp.id] = emp;
                                    refs.current[emp.id].attendance = {
                                        employee_id: emp.id,
                                        is_onsite: 0,
                                        remarks: "Planned Leave",
                                        is_holiday: 0,
                                        location: "Within Cebu",
                                    };
                                });
                            }
                        });
                }
            });
        }
    }, [rehydrated, userInfo]);

    return (
        <>
            {!!hasRecorded && (
                <Typography variant="body1">
                    <Icon
                        style={{ transform: "translateY(6px)", marginRight: 8 }}
                    >
                        info_outline
                    </Icon>
                    You've already submitted report for today.
                </Typography>
            )}
            {!hasRecorded && userInfo?.user && (
                <>
                    <List>
                        <ListItemText
                            primary={userInfo.user.team.name}
                            secondary="Team"
                        />
                        <ListItemText
                            primary={
                                userInfo.user.team.lead?.first_name +
                                " " +
                                userInfo.user.team.lead?.last_name
                            }
                            secondary="Lead"
                        />
                        <ListItemText
                            primary={userInfo.user.department?.name}
                            secondary="Department"
                        />
                    </List>
                    <table>
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Shift</th>
                                <th>Group</th>
                                <th>Work Type</th>
                                <th>PTO</th>
                                <th>Holiday</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.map((employee) => (
                                <tr>
                                    <td>
                                        {employee.first_name}{" "}
                                        {employee.last_name}
                                    </td>
                                    <td>
                                        {employee.shift_schedule?.from} -{" "}
                                        {employee.shift_schedule?.to}
                                    </td>
                                    <td>
                                        {employee.hybrid_schedule_team?.name}
                                    </td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                refs.current[
                                                    employee.id
                                                ].attendance.is_onsite =
                                                    e.target.value === "Onsite";
                                            }}
                                        >
                                            <option value="WFH">WFH</option>
                                            <option value="Onsite">
                                                Onsite
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                refs.current[
                                                    employee.id
                                                ].attendance.remarks =
                                                    e.target.value;
                                            }}
                                        >
                                            <option value="Planned Leave">
                                                Planned Leave
                                            </option>
                                            <option value="Unplanned Leave">
                                                Unplanned Leave
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                refs.current[
                                                    employee.id
                                                ].attendance.is_holiday =
                                                    e.target.checked;
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                refs.current[
                                                    employee.id
                                                ].attendance.location =
                                                    e.target.value;
                                            }}
                                        >
                                            <option value="Within Cebu">
                                                Within Cebu
                                            </option>
                                            <option value="Outside Cebu">
                                                Outside Cebu
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <Button variant="contained" onClick={submitAttendance}>
                        Save
                    </Button>
                </>
            )}
        </>
    );
}

export default RecordAttendance;
