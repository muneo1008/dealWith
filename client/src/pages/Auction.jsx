import React, {useEffect, useState} from 'react';
import {
    AppBar, Box, Card, CardContent, CardMedia,
    createTheme,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Auction = () => {
    const navigate = useNavigate();
    const theme = createTheme();
    const [auctions, setAuctions] = useState([]);
    const handleAddClick = () => {
        navigate("/addauction")

    };
    useEffect(() => {
        axios.get("http://localhost:8080/load/auction",{withCredentials:true})
            .then(res => {
                console.log(res.data);
                setAuctions(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
    }, []);
    const handleCardClick = (auction) => {
        // 해당 아이템의 idx로 상세 페이지로 이동
        navigate(`/auction/${auction.idx}`);
    };
    return(
      <>
              <AppBar position="fixed">
                  <Toolbar>
                      <Typography variant="h6">
                          경매
                      </Typography>
                  </Toolbar>
              </AppBar>

          <Toolbar/>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1}}>
              {auctions.map((auction) => (
                  <Card
                      key={auction.idx}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1, cursor: 'pointer' }}
                      onClick={() => handleCardClick(auction)}// 클릭 시 상세 페이지로 이동
                  >
                      <CardMedia
                          component="img"
                          sx={{ width: 125, height: 125, objectFit: 'cover' }}
                          image={auction.imgUrl}
                          alt={auction.title}
                      />
                      <CardContent sx={{ flex: 1 }}>
                          <Typography variant="h6" component="div">
                              상품명: {auction.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                              시작 시간: {new Date(auction.startTime).toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                              종료 시간: {new Date(auction.endTime).toLocaleString()}
                          </Typography>
                          <Typography variant="h6" color="primary">
                              시작 가격: {auction.startPrice}원
                          </Typography>
                      </CardContent>

                  </Card>
              ))}
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
          </Box>
      </>
    );
};

export default Auction;
