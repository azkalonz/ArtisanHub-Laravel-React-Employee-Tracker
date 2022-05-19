import { action, thunk } from "easy-peasy";
import axios from "../../utils/axios";

const userModel = {
    userInfo: null,
    setUserInfo: action((state, payload) => {
        state.userInfo = payload;
    }),
    login: thunk(async (actions, { email, password }) => {
        try {
            const result = await axios.post("login", { email, password });
            if (result?.data && result.data?.token) {
                actions.setUserInfo(result.data);
                return result.data;
            }
            return result.data;
        } catch (e) {
            return e.response.data;
        }
    }),
};
export default userModel;
