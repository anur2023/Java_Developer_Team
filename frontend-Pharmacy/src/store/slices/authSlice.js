import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/storage";

const initialState = {
    user: getUser(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;