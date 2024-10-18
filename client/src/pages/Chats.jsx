import {AppBar, Box, createTheme, ThemeProvider, Toolbar, Typography} from "@mui/material";
import React from "react";

const Chats = ()=>{
    const theme = createTheme();
    return(
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6">
                            채팅
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Toolbar/>
            <Box>
                <h2>채팅 페이지</h2>
            </Box>
        </>
    );
}
export default Chats;
