import {
    AppBar,
    Box,
    Button,
    createTheme, List,
    ListItem,
    ListItemText,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";
import {getCookie} from "../Cookie.js";
import {useSelector} from "react-redux";

const AuctionChat = ()=>{
    const [stompClient, setStompClient] = useState(null);
    const user = useSelector((state) => state.user);
    const userIdx = user.idx;
    const {id} = useParams();
    const navigate = useNavigate();
    const token = getCookie("jwt");
    const theme = createTheme();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const handleClick = ()=>{
        navigate(-1);
    }
    const sendMessage = () => {
        if (stompClient && message.trim()) {
            const chatMessage = { roomId: id, price: message };
            stompClient.send(`/app/auction/${id}`, {Authorization: `Bearer ${token}`}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({Authorization: `Bearer ${token}`}, () => {
            stompClient.subscribe(`/topic/auction/${id}`, (msg) => {
                const newMessage = JSON.parse(msg.body);
                console.log("newMesage: "+newMessage.senderId);
                setMessages(prev => [...prev, newMessage]);

            });
        });
        setStompClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [id]);
    return(
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh', // 전체 화면 높이
                }}
            >
                <ThemeProvider theme={theme}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <Button
                                onClick={handleClick}
                                color="inherit"
                            >
                                <Typography variant="h6">
                                    중고 거래
                                </Typography>
                            </Button>

                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <Toolbar/>
                <Box
                    sx={{
                        padding: 2,
                        height: '90vh',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        '&::-webkit-scrollbar': {
                            width: '10px', // 스크롤바 너비 설정
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888', // 스크롤바 색상
                            borderRadius: '10px', // 스크롤바 둥글게
                            border: '2px solid transparent', // 테두리를 추가하여 둥글게 보이도록
                            backgroundClip: 'content-box', // 테두리 부분이 겹치지 않게
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#555', // 스크롤바 호버 시 색상
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'none', // 트랙(스크롤바 배경) 배경 제거
                        },
                        '&::-webkit-scrollbar-button': {
                            display: 'none', // 위아래 화살표 제거
                        }
                    }}>
                    <List>
                        {messages.map((msg, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: (userIdx == msg.senderId) ? 'flex-end' : 'flex-start', // 좌우 정렬
                                    }}
                                >
                                    {userIdx != msg.senderId ? (
                                        <>
                                            <Box
                                                sx={{
                                                    backgroundColor: '#daf8cb', // 유저별 배경색
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    maxWidth: '60%', // 메시지 너비 제한
                                                    textAlign: 'left',
                                                    display: 'flex', // Flexbox 활성화
                                                    flexDirection: 'column'// 텍스트 정렬
                                                }}
                                            >
                                                <Typography variant="body2" color="textSecondary"
                                                            sx={{marginBottom: '5px'}}>
                                                    User {msg.senderId}
                                                </Typography>
                                                <ListItemText
                                                    primary={JSON.parse(msg.message).message} // 메시지 표시
                                                />
                                            </Box>
                                            <Box sx={{
                                                marginLeft: '8px',
                                                color: 'gray',
                                                flexDirection: 'column',
                                                display: 'flex'
                                            }}>
                                                {/*<Typography variant="caption">{formattedDate}</Typography>*/}
                                                {/*<Typography variant="caption">{formattedTime}</Typography>*/}
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            <Box sx={{
                                                marginLeft: '8px',
                                                color: 'gray',
                                                flexDirection: 'column',
                                                display: 'flex'
                                            }}>
                                                {/*<Typography variant="caption">{formattedDate}</Typography>*/}
                                                {/*<Typography variant="caption">{formattedTime}</Typography>*/}
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor: '#f1f0f0', // 상대방별 배경색
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    maxWidth: '60%', // 메시지 너비 제한
                                                    textAlign: 'right',
                                                    display: 'flex', // Flexbox 활성화
                                                    flexDirection: 'column'// 텍스트 정렬
                                                }}
                                            >
                                                <Typography variant="body2" color="textSecondary"
                                                            sx={{marginBottom: '5px'}}>
                                                    User {msg.senderId}
                                                </Typography>
                                                <ListItemText
                                                    primary={JSON.parse(msg.message).message} // 메시지 표시
                                                />
                                            </Box>
                                        </>
                                    )}
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                    <TextField
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} // 입력 필드 변경 처리
                        placeholder="입찰가를 입력하세요..."
                        sx={{ flexGrow: 1 }} // 남은 공간을 텍스트 필드가 차지하도록 설정
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                        sx={{ marginLeft: 1, whiteSpace: 'nowrap',height: '56px' }} // 버튼 텍스트가 한 줄로 표시되도록 설정
                    >
                        입찰하기
                    </Button>
                </Box>
            </Box>

        </>
    );
}
export default AuctionChat;
