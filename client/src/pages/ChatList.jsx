import {
    AppBar, Avatar,
    Box,
    Button,
    createTheme, Divider,
    List,
    ListItem,
    ListItemAvatar, ListItemText, Tab, Tabs,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ChatList = ({buyerId})=>{
    const theme = createTheme();
    const navigate = useNavigate();
    const [chatList, setChatList] = useState([]);
    const [auctionList, setAuctionList] = useState([])
    const [value, setValue] = useState(0);
    useEffect(() => {
        if(value === 0){
            fetchchatList();
        }else {
            fetchAuctionList();
        }

    }, [value]);
    const fetchchatList = async ()=>{
        const response = axios.get("http://localhost:8080/chatlist",{withCredentials:true})
            .then(res => {
                console.log(res.data);
                setChatList(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
    }
    const fetchAuctionList = async ()=>{
        const response = await axios.get("http://localhost:8080/my-auction-rooms",{withCredentials:true})
            .then(res => {
                console.log(res.data);
                setAuctionList(res.data);
            })
            .catch(err =>{
                console.log(err);
            })
    }
    const handleChat = (chat)=>{
        navigate(`/chat/${chat.id}`);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAuction = (auction) => {
        navigate(`/auction/chat/${auction.roomId}`);
    }
    return(
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6">
                            채팅
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Toolbar/>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="나의 중고" />
                <Tab label="나의 경매" />
            </Tabs>
            <List>
                {value === 0 ? (
                    chatList.length === 0 ? (
                        <ListItem alignItems="center">
                            <Typography component="span" variant="body2">
                                생성한 채팅이 없습니다.
                            </Typography>
                        </ListItem>
                    ):(
                        chatList.map((chat) => (
                            <Box key={chat.id}>
                                <ListItem alignItems="flex-start" onClick={()=>{handleChat(chat)}}>
                                    <ListItemAvatar>
                                        <Avatar >{chat.sellerId}</Avatar> {/* Seller ID를 아바타로 사용 */}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`판매자: ${chat.sellerId}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    Buyer ID: {chat.buyerId}<br/>
                                                </Typography>
                                                <Typography component="span">
                                                    {chat.productId ? "중고거래" : "경매"}<br/>
                                                </Typography>
                                                <Typography  component="span" variant="body2" color="text.secondary">
                                                    채팅방 생성일: {new Date(chat.createdAt).toLocaleString()} {/* 날짜 포맷 */}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Box>
                        ))
                    )
                ):(auctionList.length === 0 ? (
                        <ListItem alignItems="center">
                            <Typography component="span" variant="body2">
                                생성한 채팅이 없습니다.
                            </Typography>
                        </ListItem>
                    ):(
                        auctionList.map((auction,index) => (
                            <Box key={index}>
                                <ListItem alignItems="flex-start" onClick={()=>handleAuction(auction)}>
                                    <ListItemAvatar>
                                        <Avatar >{auction.roomId}</Avatar> {/* Seller ID를 아바타로 사용 */}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`상품: ${auction.title}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span">
                                                    {auction.productId ? "중고거래" : "경매"}<br/>
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Box>
                        ))
                    )

                )}

            </List>
        </>
    );
}
export default ChatList;
