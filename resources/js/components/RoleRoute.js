import React from "react";
import { useStoreRehydrated, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Admin from "../pages/Admin";
import axios from "../utils/axios";

function RoleRoute(props) {
    const { userInfo } = useStoreState((states) => states.user);
    const rehydrated = useStoreRehydrated();
    const history = useHistory();
    const Component = React.useMemo(
        () => () =>
            (
                <Admin>
                    <props.component />
                </Admin>
            ),
        [props.component]
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
