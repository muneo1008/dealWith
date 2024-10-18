import React from 'react';
import {
    AppBar, Box,
    createTheme,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

const Auction = () => {
    const navigate = useNavigate();
    const theme = createTheme();
    const handleAddClick = () => {
        navigate("/addauction")

    };
    return(
      <>
          <ThemeProvider theme={theme}>
              <AppBar position="fixed">
                  <Toolbar>
                      <Typography variant="h6">
                          경매
                      </Typography>
                  </Toolbar>
              </AppBar>
          </ThemeProvider>
          <Toolbar/>
          <Box>
              <h2>경매 페이지</h2>
          </Box>
          <IconButton
              onClick={handleAddClick}
              sx={{
                  position: 'fixed',
                  bottom: 80,
                  right: 20,
                  backgroundColor: '#1976d2',
                  color: 'white',
                  zIndex: 1,
                  borderRadius: '50%',
                  width: 56,
                  height: 56,
                  '&:hover': {
                      backgroundColor: '#155a8a',
                  },
              }}
          >
              <AddIcon />
          </IconButton>
      </>
    );
};

export default Auction;
