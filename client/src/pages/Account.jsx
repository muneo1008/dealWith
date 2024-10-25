
import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box,
    Button, Card, CardContent, CardMedia,
    Container,
    createTheme,
    Paper, Tab,
    Tabs,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {isLogin,isJwt,showBottomNav} from "../store.jsx";
import axios from "axios";
import {removeCookie} from "../Cookie.js";

const Account = () => {
    const navigate = useNavigate();
    const theme = createTheme();
    const user = useSelector((state) => {return state.user});
    const [auctions, setAuctions] = useState([]);
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch(isLogin(false));
        removeCookie('jwt');
        navigate('/login');
    };
    const fetchAuctions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/myauction/${user.idx}`,{withCredentials:true}); // 경매 API 요청
            setAuctions(response.data);
            console.log("경매"+response.data);
        } catch (error) {
            console.error("경매 데이터 가져오기 실패:", error);
        }
    };

    const fetchUsedItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/myitem/${user.idx}`,{withCredentials:true}); // 중고물품 API 요청
            console.log(response.data);
            setItems(response.data);
        } catch (error) {
            console.error("중고물품 데이터 가져오기 실패:", error);
        }
    };
    useEffect(() => {
        if (value === 1) {
            fetchAuctions();
        } else {
            fetchUsedItems();
        }
    }, [value]);
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
            <Container maxWidth="sm" sx={{ marginTop: 4 }}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        사용자 정보
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        닉네임: {user.nicKName}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        이메일: {user.email}
                    </Typography>
                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogout}
                        >
                            로그아웃
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Container maxWidth="sm" sx={{ marginTop: 4 }}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="나의 중고" />
                        <Tab label="나의 경매" />
                    </Tabs>
                    <Box sx={{ padding: 2 }}>
                        {value === 0 && (
                            <Box display="flex" flexDirection="column" gap={2} mt={2}>
                                {items.length === 0 ? (<Typography variant="body2" color="text.secondary" textAlign="center">
                                    등록한 상품이 없습니다.
                                </Typography>): (
                                    items.map((item) => (
                                            <Card key={item.idx} sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 125, height: 125, objectFit: 'cover' }}
                                                    image={item.imgUrl}
                                                    alt={item.title}
                                                />
                                                <CardContent sx={{ flex: 1 }}>
                                                    <Typography variant="h6">상품명: {item.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        등록일: {new Date(item.created_at).toLocaleDateString()} {/* 날짜 형식 변경 */}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                )}

                            </Box>
                        )}
                        {value === 1 && (
                            <Box display="flex" flexDirection="column" gap={2} mt={2}>
                                {auctions.length === 0 ? (<Typography variant="body2" color="text.secondary" textAlign="center">
                                    등록한 경매가 없습니다.
                                </Typography>): (
                                    auctions.map((item) => (
                                        <Card key={item.idx} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 125, height: 125, objectFit: 'cover' }}
                                                image={item.imgUrl}
                                                alt={item.title}
                                            />
                                            <CardContent sx={{ flex: 1 }}>
                                                <Typography variant="h6">상품명: {item.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    시작일: {new Date(item.startTime).toLocaleString()} {/* 날짜 형식 변경 */}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    종료일: {new Date(item.endTime).toLocaleString()} {/* 날짜 형식 변경 */}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    등록일: {new Date(item.createdAt).toLocaleDateString()} {/* 날짜 형식 변경 */}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}

                            </Box>
                        )}
                    </Box>
                </Paper>
            </Container>

        </>

    );
};

export default Account;
