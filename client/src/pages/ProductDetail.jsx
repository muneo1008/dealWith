import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box, Button,
    Card,
    CardContent,
    CardMedia,
    createTheme,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const ProductDetail = () => {
    const {id} = useParams();
    const [item, setItem] = useState([]);
    const [sellerId, setSellerId] = useState(null);
    const [productId, setProductId] = useState(null)
    const theme = createTheme();
    const navigate = useNavigate();
    const fetchItemDetails = async (id) => {
        const res = await axios.get(`http://localhost:8080/item/${id}`,{withCredentials:true})
            .then((response) => {
            console.log(response);
            setItem(response.data);
            setSellerId(response.data.userIdx);
            setProductId(response.data.idx);
            console.log("seller: "+response.data.userIdx);
            console.log("productId: "+response.data.idx);
        }).catch((error) => {
            console.log(error);
        })
    };
    useEffect(() => {
        fetchItemDetails(id);
    },[id])
    const handleBackClick = ()=>{
        navigate(-1);
    }
    const handleBuyClick = () => {
        axios.post("http://localhost:8080/createChat", {sellerId:Number(sellerId),productId:Number(productId)},{withCredentials:true})
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    };
    return(
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
                    <Typography variant="h6">중고 거래</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Card sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 400, objectFit: 'cover' }}
                    image={item.imgUrl}
                    alt={item.title}
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
                            {item.title}
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
                            {item.description}
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
                            가격: {item.price}원
                        </Typography>
                        <Typography variant="body2" >
                            등록일: {item.created_at}
                        </Typography>
                        <Typography variant="body2" color={item.status ? 'red' : 'green'}>
                            {item.status ? '판매 완료' : '판매 중'}
                        </Typography>
                        <Typography variant="body2" color={item.priceNego ? 'green' : 'red'}>
                            가격 제안 {item.priceNego ? '가능' : '불가능'}
                        </Typography>
                    </Box>

                    {/* 구매하기 버튼 */}
                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBuyClick}
                            disabled={item.status}  // 판매 완료인 경우 버튼 비활성화
                        >
                            {item.status ? '구매 불가' : '구매하기'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </>

    );
};
export default ProductDetail;
