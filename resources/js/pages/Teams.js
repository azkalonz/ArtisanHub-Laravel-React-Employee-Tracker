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
    Select,
    Typography,
} from "@mui/material";
import { useStoreRehydrated } from "easy-peasy";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";

function Teams() {
    const rehydrated = useStoreRehydrated();
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState();
    const [employees, setEmployees] = useState({});
    const [departments, setDepartments] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const saveItem = useCallback(() => {
        if (!!!selectedItem) return;
        setIsSaving(true);
        axios
            .post("update/team/" + selectedItem.id, selectedItem)
            .then(({ data }) => {
                if (data?.id) {
                    const s = [...items];
                    const index = s.findIndex((q) => q.id === data.id);
                    if (index >= 0) {
                        s[index] = data;
                    } else {
                        s.unshift(data);
                    }
                    setItems(s);
                }
                setIsSaving(false);
            })
            .catch(() => {
                enqueueSnackbar("Something went wrong", {
                    type: "warning",
                });
                setIsSaving(false);
            });
    }, [selectedItem, items]);

    const deleteItem = useCallback(() => {
        if (!selectedItem?.id) return;
        setIsSaving(true);
        axios.delete("delete/team/" + selectedItem.id).then(({ data }) => {
            if (data) {
                const s = [...items];
                const index = s.findIndex((q) => q.id === selectedItem.id);
                if (index >= 0) {
                    s.splice(index, 1);
                }
                enqueueSnackbar("Successfully deleted", {
                    type: "success",
                });
                setItems(s);
                setSelectedItem(null);
            } else
                enqueueSnackbar("Something went wrong", {
                    type: "warning",
                });
            setIsSaving(false);
        });
    }, [selectedItem, items]);

    const setItemState = (id, val) => {
        if (!selectedItem) return;
        const e = { ...selectedItem };
        e[id] = val;
        setSelectedItem(e);
    };

    useEffect(() => {
        if (rehydrated) {
            axios.get("list/teams").then(async ({ data }) => {
                const emp = await axios.get("list/employee-names");
                const department = await axios.get("list/departments");
                const e = {};
                const d = {};
                if (emp?.data) {
                    emp.data.forEach((dd) => {
                        e[dd.id] = dd.first_name + " " + dd.last_name;
                    });
                }
                if (department?.data) {
                    department.data.forEach((dd) => {
                        d[dd.id] = dd.name;
                    });
                }
                setEmployees(e);
                setDepartments(d);
                if (data) {
                    setItems(data);
                }
                setIsLoading(false);
            });
        }
    }, [rehydrated]);

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Button
                onClick={() => {
                    setSelectedItem({ id: -1 });
                }}
            >
                Add Team
            </Button>
            <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)}>
                <DialogTitle>
                    {selectedItem?.id > 0 ? "Update Team" : "Add Team"}
                </DialogTitle>
                <DialogContent style={{ minWidth: 490 }}>
                    {isSaving && <CircularProgress />}
                    {!isSaving && (
                        <>
                            <Typography variant="caption">Info</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Team" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState("name", e.target.value)
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.first_name}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Lead" />
                                    <Select
                                        onChange={(e) =>
                                            setItemState(
                                                "lead_id",
                                                e.target.value
                                            )
                                        }
                                        defaultValue={selectedItem?.lead_id}
                                    >
                                        {Object.keys(employees).map((id) => (
                                            <MenuItem key={id} value={id}>
                                                {employees[id]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Department" />
                                    <Select
                                        onChange={(e) =>
                                            setItemState(
                                                "department_id",
                                                e.target.value
                                            )
                                        }
                                        defaultValue={
                                            selectedItem?.department_id
                                        }
                                    >
                                        {Object.keys(departments).map((id) => (
                                            <MenuItem key={id} value={id}>
                                                {departments[id]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </ListItem>
                            </List>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button onClick={() => setSelectedItem(null)}>
                            Cancel
                        </Button>
                        {selectedItem?.id > 0 && (
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={deleteItem}
                            >
                                Delete
                            </Button>
                        )}
                        <Button variant="contained" onClick={saveItem}>
                            Save
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
            <MaterialTable
                title="Teams"
                data={items}
                isLoading={isLoading}
                options={{
                    pageSize: 10,
                }}
                onRowClick={(e, data) => {
                    setSelectedItem(data);
                }}
                columns={[
                    {
                        title: "Team ID",
                        field: "id",
                    },
                    {
                        title: "Team",
                        field: "name",
                    },
                    {
                        title: "Lead",
                        field: "lead_id",
                        lookup: employees,
                    },
                    {
                        title: "Department",
                        field: "department_id",
                        lookup: departments,
                    },
                ]}
            />
        </Grid>
    );
}

export default Teams;
