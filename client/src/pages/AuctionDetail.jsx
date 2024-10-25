import {AppBar, Box, Button, Card, CardContent, CardMedia, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

const AuctionDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    const [auction, setAuction] = useState([]);
    const fetchItemDetails = async () => {
        const res = await axios.get(`http://localhost:8080/auction/${id}`,{withCredentials:true})
            .then((response) => {
                console.log(response.data);
                setAuction(response.data);
            }).catch((error) => {
                console.log(error);
            })
    };
    const joinAuction = async ()=>{
        const response = axios.post(`http://localhost:8080/auctionRoom/${id}/join`,
            {roomId: id},
            {withCredentials:true})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleBackClick = () =>{
        navigate(-1);
    }
    useEffect(() => {
        fetchItemDetails(id);
    }, []);
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    {/* 뒤로가기 버튼 */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleBackClick}
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    {/* 제목 */}
                    <Typography variant="h6">경매</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Card sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 400, objectFit: 'cover' }}
                    image={auction.imgUrl}
                    alt={auction.title}
                />
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        상품명
                    </Typography>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: 1,
                            marginBottom: 2
                        }}
                    >
                        <Typography variant="h4" component="div">
                            {auction.title}
                        </Typography>
                    </Box>
                    <Typography variant="h6" component="div" gutterBottom>
                        상품설명
                    </Typography>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: 1,
                            marginBottom: 2
                        }}
                    >
                        <Typography variant="body1" width={"bold"}>
                            {auction.description}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: 2,
                            marginBottom: 2
                        }}
                    >
                        <Typography variant="h6" color="primary">
                            시작 가격: {auction.startPrice}원
                        </Typography>
                        <Typography variant="h6" >
                            시작 시간: {new Date(auction.startTime).toLocaleString()}
                        </Typography>
                        <Typography variant="h6" >
                            종료 시간: {new Date(auction.endTime).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" >
                            등록일: {auction.createdAt}
                        </Typography>


                    </Box>

                    {/* 구매하기 버튼 */}
                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={joinAuction}
  // 판매 완료인 경우 버튼 비활성화
                        >
                            {auction.status ? '경매 참가 불가' : '경매 참가'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </>
    );
};
export default AuctionDetails;
