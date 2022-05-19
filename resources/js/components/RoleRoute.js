import React from "react";
import { useStoreRehydrated, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Admin from "../pages/Admin";
import axios from "../utils/axios";
import Lead from "../pages/Lead";

function RoleRoute(props) {
    const { userInfo } = useStoreState((states) => states.user);
    const rehydrated = useStoreRehydrated();
    const history = useHistory();
    const Component = React.useMemo(
        () => () => {
            switch (props.role) {
                case "admin":
                    return (
                        <Admin>
                            <props.component />
                        </Admin>
                    );
                default:
                    return (
                        <Lead>
                            <props.component />
                        </Lead>
                    );
            }
        },
        [props.component, props.role]
    );

    useEffect(() => {
        if (rehydrated && userInfo?.user?.role !== props.role) {
            history.replace("/login");
        } else if (!!userInfo?.token) {
            axios.defaults.headers = {
                Authorization: "Bearer " + userInfo.token,
            };
        }
    }, [userInfo, rehydrated]);

    return <Route {...props} component={Component} />;
}

export default RoleRoute;
