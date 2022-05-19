import { CircularProgress, List, ListItemText } from "@mui/material";
import axios from "../utils/axios";
import { useStoreRehydrated, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const qs = require("query-string");

function EmployeeRecords(props) {
    const history = useHistory();
    const rehydrated = useStoreRehydrated();
    const { month = "05" } = qs.parse(history.location.search);
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo } = useStoreState((states) => states.user);

    useEffect(() => {
        if (rehydrated) {
            axios.get("list/attendance?month=" + month).then((resp) => {
                if (resp.data) {
                    setRecords(resp.data);
                }
                setIsLoading(false);
            });
        }
    }, [rehydrated]);

    return (
        <>
            {isLoading && <CircularProgress />}
            {userInfo?.user && (
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
                        primary={(() => {
                            const bonus = userInfo.user.bonus?.amount || 0;
                            const totalWorkingDays = records?.length || 1;
                            const totalWorkingOnSite = (
                                records?.filter((q) => !!q.is_onsite) || []
                            ).length;
                            return (
                                (bonus / totalWorkingDays) * totalWorkingOnSite
                            );
                        })()}
                        secondary="Accumulated Pro-Rated Attendance Bonus"
                    />
                    <ListItemText
                        primary={(() => {
                            const bonus =
                                userInfo.user.hazard_pay?.payment || 0;
                            const totalWorkingOnSite = (
                                records?.filter((q) => !!q.is_onsite) || []
                            ).length;
                            return bonus * totalWorkingOnSite;
                        })()}
                        secondary="Accumulated Pro-Rated Hazard Pay"
                    />
                    <ListItemText
                        primary={userInfo.user.department?.name || "None"}
                        secondary="Department"
                    />
                </List>
            )}
            {!isLoading && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Shift</th>
                                <th>Group</th>
                                <th>Work Type</th>
                                <th>PTO</th>
                                <th>Holiday</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records?.map((record) => (
                                <tr>
                                    <td>
                                        {record.employee?.shift_schedule?.from}{" "}
                                        - {record.employee?.shift_schedule?.to}
                                    </td>
                                    <td>
                                        {
                                            record.employee
                                                ?.hybrid_schedule_team?.name
                                        }
                                    </td>
                                    <td>
                                        {record.is_onsite ? "Onsite" : "WFH"}
                                    </td>
                                    <td>{record.remarks}</td>
                                    <td>{record.is_holiday ? "Yes" : "No"}</td>
                                    <td>{record.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}

export default EmployeeRecords;
