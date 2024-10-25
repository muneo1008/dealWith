import {configureStore, createSlice} from "@reduxjs/toolkit";


let user = createSlice(
    {
        name: "user",
        initialState: {
            idx:0,
            nicKName: "",
            email: "",
            isLogin: true,
            isJwt:true,
            showBottomNav:true,
        },
        reducers: {
            changeNickname(state, action) {
                state.nicKName = action.payload;
            },
            changeEmail(state, action) {
                state.email = action.payload;
            },
            isLogin(state, action){
                state.isLogin = action.payload;
            },
            isJwt(state, action){
                state.isJwt = action.payload;
            },
            showBottomNav(state, action){
                state.showBottomNav = action.payload;
            },
            changeIdx(state, action) {
                state.idx = action.payload;
            }
        }
    }
)
export let {changeNickname,changeEmail,isLogin,isJwt,showBottomNav,changeIdx} = user.actions;


export default configureStore({
    reducer: {
        user: user.reducer,
        // userEmail: userEmail.reducer
    }
})
