import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        presentUser: null,
        errorMessage: null,
        loading: false,
    },
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.errorMessage = null;
        },
        signInSuccess: (state, action) => {
            state.presentUser = action.payload;
            state.loading = false;
            state.errorMessage = null;
        },
        signInFailure: (state, action) => {
            state.presentUser = null;
            state.errorMessage = action.payload;
            state.loading = false;
        },
        updateStart: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
        },
        updateSuccess: (state, action) => {
            state.presentUser = action.payload;
            state.loading = false;
            state.errorMessage = null;
        },
        updateFailure: (state, action) => {
            state.presentUser = null;
            state.errorMessage = action.payload;
            state.loading = false;
        },
        deleteStart: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
        },
        deleteSuccess: (state, action) => {
            state.presentUser = null;
            state.loading = false;
            state.errorMessage = null;
        },
        deleteFailure: (state, action) => {
            state.presentUser = null;
            state.errorMessage = action.payload;
        },
        signoutSuccess: (state, action) => {
            state.presentUser = null;
            state.loading = false;
            state.errorMessage = null;
        },

    }
}
)

// Action creators are generated for each case reducer function
export const { signInFailure, signInSuccess, signInStart, updateFailure, updateStart, updateSuccess, deleteFailure, deleteStart, deleteSuccess, signoutSuccess } = userSlice.actions

export default userSlice.reducer