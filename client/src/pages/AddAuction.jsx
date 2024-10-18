
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
const AddAuction = () => {
    const theme = createTheme();
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [startingBid, setStartingBid] = useState('');
    const [transactionMethod, setTransactionMethod] = useState('택배');
    const [itemImage, setItemImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setItemImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 경매 등록 로직을 여기에 추가
        console.log({
            itemName,
            itemDescription,
            startDate,
            startTime,
            endDate,
            endTime,
            startingBid,
            transactionMethod,
            itemImage,
        });
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
            <Container style={{ marginTop: '20px', marginBottom: '20px'}}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        경매 상품 등록
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box mb={2} display="flex" justifyContent="space-between">
                                <Box width="48%">
                                    <Typography variant="body1">경매 시작 날짜</Typography>
                                    <DatePicker
                                        value={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        slots={{ textField: (params) => <TextField fullWidth {...params} /> }}
                                    />
                                </Box>

                                <Box width="48%">
                                    <Typography variant="body1">경매 종료 날짜</Typography>
                                    <DatePicker
                                        value={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        slots={{ textField: (params) => <TextField fullWidth {...params} /> }}
                                    />
                                </Box>
                            </Box>

                            {/* 경매 시작 시간과 종료 시간을 가로로 배치 */}
                            <Box mb={2} display="flex" justifyContent="space-between">
                                <Box width="48%">
                                    <Typography variant="body1">경매 시작 시간</Typography>
                                    <TimePicker
                                        value={startTime}
                                        onChange={(time) => setStartTime(time)}
                                        slots={{ textField: (params) => <TextField fullWidth {...params} /> }}
                                    />
                                </Box>

                                <Box width="48%">
                                    <Typography variant="body1">경매 종료 시간</Typography>
                                    <TimePicker
                                        value={endTime}
                                        onChange={(time) => setEndTime(time)}
                                        slots={{ textField: (params) => <TextField fullWidth {...params} /> }}
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

                        {/* 거래방식 선택 (택배, 직거래) */}
                        <FormControl component="fieldset" style={{ marginTop: '16px' }}>
                            <FormLabel component="legend">거래방식</FormLabel>
                            <RadioGroup
                                row
                                value={transactionMethod}
                                onChange={(e) => setTransactionMethod(e.target.value)}
                            >
                                <FormControlLabel value="택배" control={<Radio />} label="택배" />
                                <FormControlLabel value="직거래" control={<Radio />} label="직거래" />
                            </RadioGroup>
                        </FormControl>

                        {/* 이미지 업로드 및 미리보기 */}
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
