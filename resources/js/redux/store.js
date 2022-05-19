import { createStore, persist } from "easy-peasy";
import userModel from "./models/userModel";

const store = createStore(
    {
        user: persist(userModel, {
            storage: "localStorage",
        }),
    },
    {
        version: 2,
    }
);

export default store;
