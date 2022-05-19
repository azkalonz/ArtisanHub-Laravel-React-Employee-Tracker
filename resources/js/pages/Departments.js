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
    Typography,
} from "@mui/material";
import { useStoreRehydrated } from "easy-peasy";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";

function Departments() {
    const rehydrated = useStoreRehydrated();
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const saveItem = useCallback(() => {
        if (!!!selectedItem) return;
        setIsSaving(true);
        axios
            .post("update/employee/" + selectedItem.id, selectedItem)
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
                enqueueSnackbar("Duplicate/Invalid Email", {
                    type: "warning",
                });
                setIsSaving(false);
            });
    }, [selectedItem, items]);

    const deleteItem = useCallback(() => {
        if (!selectedItem?.id) return;
        setIsSaving(true);
        axios.delete("delete/employee/" + selectedItem.id).then(({ data }) => {
            if (data) {
                const s = [...items];
                const index = s.findIndex((q) => q.id === selectedItem.id);
                if (index >= 0) {
                    s.splice(index, 1);
                }
                enqueueSnackbar("Successfully deleted employee", {
                    type: "success",
                });
                setItems(s);
                setSelectedItem(null);
            } else
                enqueueSnackbar("Can't delete employee", {
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
            axios.get("list/departments").then(async ({ data }) => {
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
                Add Department
            </Button>
            <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)}>
                <DialogTitle>
                    {selectedItem?.id > 0
                        ? "Update Department"
                        : "Add Department"}
                </DialogTitle>
                <DialogContent style={{ minWidth: 490 }}>
                    {isSaving && <CircularProgress />}
                    {!isSaving && (
                        <>
                            <Typography variant="caption">Personal</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="First Name" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.first_name}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Middle Name" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "middle_name",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.middle_name}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Last Name" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "last_name",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.last_name}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Birthdate" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "birthdate",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.birthdate}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Gender" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.gender}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Civil Status" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "status",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.status}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Address" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.address}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Mobile Number" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "mobile_number",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={
                                            selectedItem?.mobile_number
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Designation" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "designation",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.designation}
                                    />
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
                title="Departments"
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
                        title: "Department ID",
                        field: "id",
                    },
                    {
                        title: "Department",
                        field: "name",
                    },
                ]}
            />
        </Grid>
    );
}

export default Departments;
