import {configureStore, createSlice} from "@reduxjs/toolkit";


let user = createSlice(
    {
        name: "user",
        initialState: {
            name: "",
            email: "",
        },
        reducers: {
            changeName(state, action) {
                state.name = action.payload;
            },
            changeEmail(state, action) {
                state.email = action.payload;
            }
        }
    }
)
export let {changeName,changeEmail} = user.actions;


export default configureStore({
    reducer: {
        user: user.reducer,
        // userEmail: userEmail.reducer
    }
})
