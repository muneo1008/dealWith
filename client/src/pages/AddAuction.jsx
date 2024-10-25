
import {
    AppBar,
    Box, Button,
    Container,
    createTheme,
    FormControl, FormControlLabel, FormLabel,
    Paper, Radio, RadioGroup,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
const AddAuction = () => {
    const theme = createTheme();
    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [itemImage, setItemImage] = useState(null);
    const [auctionId, setAuctionId] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setItemImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 경매 종료 날짜 자동 설정
    const handleEndDate = (days) => {
        const newEndDate = startDate.add(days, 'day');
        setEndDate(newEndDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startDateTime = dayjs(startDate.format('YYYY-MM-DD') + ' ' + startTime.format('HH:mm')).toISOString();
        const endDateTime = dayjs(endDate.format('YYYY-MM-DD') + ' ' + endTime.format('HH:mm')).toISOString();


        const formData = new FormData();
        formData.append('title', itemName);
        formData.append('description', itemDescription);
        formData.append('startPrice', startingBid);
        formData.append('startTime', startDateTime);
        formData.append('endTime', endDateTime);
        formData.append('itemImage', itemImage);
         try {
             const response = await axios.post('http://localhost:8080/add/auction', formData, {
                 headers: {
                     'Content-Type': 'multipart/form-data',
                 },withCredentials:true
             });
             console.log('auction added:', response.data);
             const auctionId = response.data;
             try{
                 const response = await axios.post('http://localhost:8080/create/auction', {productId: auctionId}, {
                     withCredentials:true
                 });
             }catch (err){
                 console.log("create auction room error: ",err);
             }

             alert("경매 등록 성공");

         } catch (error) {
             console.error('Error adding auction:', error);
         }
         console.log("Auction: "+auctionId);





    };
    return(
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
            <Toolbar/>
            <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        경매 상품 등록
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* 경매 시작 날짜와 종료 날짜 */}
                            <Box mb={2} display="flex" justifyContent="space-between">
                                <Box width="48%">
                                    <Typography variant="body1">경매 시작 날짜</Typography>
                                    <DatePicker
                                        value={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </Box>

                                <Box width="48%">
                                    <Typography variant="body1">경매 종료 날짜</Typography>
                                    <Box display="flex" justifyContent="space-between">
                                        <Button variant="outlined" onClick={() => handleEndDate(1)}>
                                            1일 뒤 종료
                                        </Button>
                                        <Button variant="outlined" onClick={() => handleEndDate(2)}>
                                            2일 뒤 종료
                                        </Button>
                                        <Button variant="outlined" onClick={() => handleEndDate(3)}>
                                            3일 뒤 종료
                                        </Button>
                                    </Box>
                                    {endDate && (
                                        <Typography mt={1}>종료 날짜: {endDate.format('YYYY-MM-DD')}</Typography>
                                    )}
                                </Box>
                            </Box>

                            {/* 경매 시작 시간과 종료 시간을 가로로 배치 */}
                            <Box mb={2} display="flex" justifyContent="space-between">
                                <Box width="48%">
                                    <Typography variant="body1">경매 시작 시간</Typography>
                                    <TimePicker
                                        value={startTime}
                                        onChange={(time) => setStartTime(time)}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </Box>

                                <Box width="48%">
                                    <Typography variant="body1">경매 종료 시간</Typography>
                                    <TimePicker
                                        value={endTime}
                                        onChange={(time) => setEndTime(time)}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </Box>
                            </Box>
                        </LocalizationProvider>

                        <TextField
                            fullWidth
                            label="상품 이름"
                            margin="normal"
                            variant="outlined"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="상품 설명"
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            required
                        />

                        <TextField
                            fullWidth
                            label="시작 입찰가"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            value={startingBid}
                            onChange={(e) => setStartingBid(e.target.value)}
                            required
                        />

                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-image"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="upload-image">
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    component="span"
                                    style={{ marginTop: '16px' }}
                                >
                                    이미지 업로드
                                </Button>
                            </Box>
                        </label>

                        {/* 이미지 미리보기 */}
                        {imagePreview && (
                            <Box mt={2} textAlign="center">
                                <Typography variant="body1">미리보기:</Typography>
                                <img
                                    src={imagePreview}
                                    alt="상품 미리보기"
                                    style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px', borderRadius: '10px' }}
                                />
                            </Box>
                        )}

                        <Box mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                경매 등록
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
            <Toolbar/>
        </>
    );
}
export default AddAuction;
