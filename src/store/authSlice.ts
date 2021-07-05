import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/projectList/searchPanel";
import * as auth from "authProvider";
import { AuthForm, bootstrapUser } from "context/authContext";
import { AppDispatch, RootState } from "store";
interface State {
    user: User | null;
}
const initialState: State = {
    user: null,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => {
    return (dispatch: AppDispatch) => {
        auth.login(form).then((user) => {
            dispatch(setUser(user));
        });
    };
};

export const register = (form: AuthForm) => {
    return (dispatch: AppDispatch) => {
        return auth.register(form).then((user) => {
            dispatch(setUser(user));
        });
    };
};

export const loginOut = () => {
    return (dispatch: AppDispatch) => {
        return auth.loginOut().then(() => {
            dispatch(setUser(null));
        });
    };
};

export const bootstrap = () => {
    return (dispatch: AppDispatch) => {
        return bootstrapUser().then((user) => {
            dispatch(setUser(user));
        });
    };
};
