import {AppBar, Box, Button, createTheme, Paper, TextField, ThemeProvider, Toolbar, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const theme = createTheme();
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/signup', {
                username: username,
                password: password,
            },{
                withCredentials:true
            });
            alert('로그인 성공!');
            // eslint-disable-next-line react/prop-types
            props.setIsLogin(true);
            navigate("/");
        } catch (error) {
            console.log(error);
            alert('로그인 실패: ' + (error.response || '서버 오류'));
        }
    };
    let navigate = useNavigate();
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6">
                            딜윗
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        로그인
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="아이디"
                            type="usernmae"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="비밀번호"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            로그인
                        </Button>
                    </form>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={() => { navigate("/signin") }}>
                            회원가입
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};
export default SignUp;
