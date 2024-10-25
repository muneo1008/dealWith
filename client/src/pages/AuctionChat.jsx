import {AppBar, Box, Button, createTheme, TextField, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

const AuctionChat = ()=>{
    const navigate = useNavigate();
    const theme = createTheme();
    const [message, setMessage] = useState('')
    const handleClick = ()=>{
        navigate(-1);
    }
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

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                    <TextField
                        variant="outlined"
                        value={message}
                        // onChange={(e) => setMessage(e.target.value)} // 입력 필드 변경 처리
                        placeholder="입찰가를 입력하세요..."
                        sx={{ flexGrow: 1 }} // 남은 공간을 텍스트 필드가 차지하도록 설정
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        // onClick={sendMessage}
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
