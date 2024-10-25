import React, {useState, useEffect, useRef} from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {getCookie} from "../Cookie.js";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useSelector, useDispatch} from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import{showBottomNav} from "../store.jsx";
import {
    AppBar,
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemText,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import axios from "axios";

const Chat = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const token = getCookie("jwt");
    const {id} = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    console.log("chat:"+id);
    const [stompClient, setStompClient] = useState(null);
    const userIdx = user.idx;
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/load/chat/${id}`, {
                    withCredentials:true
                });
                dispatch(showBottomNav(false));
                console.log(response.data)
                setMessages(response.data); // 가져온 메시지를 상태에 저장
            } catch (error) {
                console.error("메시지 불러오기 실패:", error);
            }
        };
        fetchMessages();
            const socket = new SockJS('http://localhost:8080/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({Authorization: `Bearer ${token}`}, () => {
                stompClient.subscribe(`/topic/chat/${id}`, (msg) => {
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
    const handleBackClick = () => {
        navigate(-1)
    };
    const sendMessage = () => {
        if (stompClient && message.trim()) {
            const chatMessage = { chatRoomId: id, message: message };
            stompClient.send(`/app/chat/${id}`, {Authorization: `Bearer ${token}`}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };
    console.log(messages)
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
        }
    }, [messages]);
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh', // 전체 화면 높이
                }}
            >
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
                        <Typography variant="h6">채팅방</Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar/>
                {/* 채팅 기록 영역 */}
                <Box
                    sx={{
                        padding: 2,
                        height: '90vh',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        // 스크롤바 스타일 적용
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
                            const date = new Date(msg.sentAt);
                            const formattedDate = date.toLocaleDateString(); // e.g., "2024-10-22"
                            const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
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
                                                <Typography variant="caption">{formattedDate}</Typography>
                                                <Typography variant="caption">{formattedTime}</Typography>
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
                                                <Typography variant="caption">{formattedDate}</Typography>
                                                <Typography variant="caption">{formattedTime}</Typography>
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
                        <div ref={messagesEndRef}/>
                    </List>

                </Box>

                {/* 메시지 입력 영역 */}
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                    <TextField
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} // 입력 필드 변경 처리
                        placeholder="메시지를 입력하세요..."
                        sx={{ flexGrow: 1 }} // 남은 공간을 텍스트 필드가 차지하도록 설정
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                        sx={{ marginLeft: 1, whiteSpace: 'nowrap',height: '56px' }} // 버튼 텍스트가 한 줄로 표시되도록 설정
                    >
                        보내기
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Chat;
