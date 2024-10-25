import {
    AppBar,
    Box,
    Button,
    createTheme, FormControl, IconButton, InputAdornment, InputLabel,
    MenuItem, Paper, Select,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography,
    Alert
} from "@mui/material";
import {useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = ()=>{
    const theme = createTheme();
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault();
        if (!username || !nickname || !email || !password || !confirmPassword || !location || !phone) {
            setError("모든 정보를 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
        setError('');
        axios.post("http://localhost:8080/register",{
            username:username,
            email:email,
            nick_name:nickname,
            password:password,
            location:location,
            phone:phone,
        },{ headers:{ 'Content-Type': 'application/json'},withCredentials:true })
            .then((res)=>{
                console.log(res.data);
                navigate("/login");
            })
            .catch((err)=>{
                console.log(err);
            })


        // 성공적으로 가입된 경우에는 에러 메시지를 초기화합니다.
        setError('');
    };
    return(
        <><ThemeProvider theme={theme}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">
                        딜윗
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
            <Toolbar/>
            <Paper elevation={3} sx={{ p: 3, maxWidth: 400, margin: 'auto',marginTop:'20px' }}>
                <Box component="form" onSubmit={handleSignUp}>
                    <Typography variant="h5" gutterBottom align="center">회원가입</Typography>

                    {error && <Alert severity="error">{error}</Alert>}



                    <TextField
                        label="아이디"
                        type="username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="비밀번호"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="비밀번호 확인"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="이메일"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="닉네임"
                        fullWidth
                        margin="normal"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>사는 지역</InputLabel>
                        <Select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <MenuItem value=""><em>선택하세요</em></MenuItem>
                            <MenuItem value="서울">서울</MenuItem>
                            <MenuItem value="부산">부산</MenuItem>
                            <MenuItem value="대구">대구</MenuItem>
                            <MenuItem value="인천">인천</MenuItem>
                            <MenuItem value="광주">광주</MenuItem>
                            <MenuItem value="대전">대전</MenuItem>
                            <MenuItem value="울산">울산</MenuItem>
                            {/* 추가 지역을 여기에 추가하세요 */}
                        </Select>
                    </FormControl>

                    <TextField
                        label="전화번호"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        회원가입
                    </Button>
                </Box>
            </Paper>
            <Toolbar/>
        </>

    );
};
export default Register;
