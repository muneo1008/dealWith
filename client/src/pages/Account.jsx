
import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, createTheme, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {removeCookie} from "../Cookie.js";
import {useSelector} from "react-redux";
const Account = () => {
    const navigate = useNavigate();
    const theme = createTheme();
    let user = useSelector((state) => {return state.user});
    // console.log("user: "+user.email);
    const handleLogout = () => {
                removeCookie('jwt');
                // props.setIsLogin(false);
                alert("로그아웃 되었습니다.");
                navigate('/signup')
    };

    return(
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6">
                            내 정보
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Toolbar/>
            <Box>
                <h2>이름: {user.name}</h2>
                <h2>이메일: {user.email}</h2>
                <Button onClick={handleLogout}>로그아웃</Button>
            </Box>

        </>

    );
};

export default Account;
