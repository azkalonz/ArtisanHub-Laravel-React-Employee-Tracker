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

function HazardPays() {
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
            .post("update/hazard-pay/" + selectedItem.id, selectedItem)
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
                enqueueSnackbar("Something went wrong!", {
                    type: "warning",
                });
                setIsSaving(false);
            });
    }, [selectedItem, items]);

    const deleteItem = useCallback(() => {
        if (!selectedItem?.id) return;
        setIsSaving(true);
        axios
            .delete("delete/hazard-pay/" + selectedItem.id)
            .then(({ data }) => {
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
                    enqueueSnackbar("Something went wrong!", {
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
            axios.get("list/hazard-pays").then(async ({ data }) => {
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
                Add Hazard Pay
            </Button>
            <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)}>
                <DialogTitle>
                    {selectedItem?.id > 0
                        ? "Update Hazard Pay"
                        : "Add Hazard Pay"}
                </DialogTitle>
                <DialogContent style={{ minWidth: 490 }}>
                    {isSaving && <CircularProgress />}
                    {!isSaving && (
                        <>
                            <Typography variant="caption">Info</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Area" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState("area", e.target.value)
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.area}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Location" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.location}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Amount" />
                                    <Input
                                        onChange={(e) =>
                                            setItemState(
                                                "payment",
                                                e.target.value
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                        defaultValue={selectedItem?.payment}
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
                title="Hazard Pays"
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
                        title: "Hazard Pay ID",
                        field: "id",
                    },
                    {
                        title: "Area",
                        field: "area",
                    },
                    {
                        title: "Location",
                        field: "location",
                    },
                    {
                        title: "Amount",
                        field: "payment",
                    },
                ]}
            />
        </Grid>
    );
}

export default HazardPays;
