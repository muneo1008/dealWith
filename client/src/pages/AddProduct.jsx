import { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    ThemeProvider,
    AppBar,
    Toolbar,
    createTheme,
    Paper,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio, Checkbox,
} from '@mui/material';
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AddProduct = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [transactionMethod, setTransactionMethod] = useState('택배');
    const [priceNegotiation, setPriceNegotiation] = useState(false);
    const [itemImage, setItemImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const theme = createTheme();
    let user = useSelector((state) => {return state.user});
    console.log(user.name);
    const navigate = useNavigate();
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

const handleSubmit = async (event) => {
    event.preventDefault();
    // 상품 등록 로직을 여기에 추가
    const formData = new FormData();
    formData.append('username', user.name);
    formData.append('itemName', itemName);
    formData.append('itemDescription', itemDescription);
    formData.append('itemPrice', itemPrice);
    formData.append('transactionMethod', transactionMethod);
    formData.append('priceNegotiation', priceNegotiation);
    formData.append('itemImage', itemImage);
    try {
        const response = await axios.post('http://localhost:8080/additem', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Item added:', response.data);
        alert("상품 등록 성공");
        navigate("/");
    } catch (error) {
        console.error('Error adding item:', error);
    }
};


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
            <Toolbar/>
            <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        중고 상품 등록
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
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
                            label="가격"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
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

                        {/* 가격제안 (불가, 가능) */}
                        <Box display="flex" justifyContent="flex-end">
                            <FormControl component="fieldset" style={{ marginTop: '16px' }}>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={priceNegotiation}
                                        onChange={(e) => setPriceNegotiation(e.target.checked)}
                                    />
                                }
                                label="가격제안 가능"
                            />
                            </FormControl>
                        </Box>

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
                                등록
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
            <Toolbar/>
        </>
    );
};

export default AddProduct;
