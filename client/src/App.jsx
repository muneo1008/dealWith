
import {Routes, Route, useNavigate} from "react-router-dom"

import Home from "./pages/Home.jsx";
import Auction from "./pages/Auction.jsx";
import Account from "./pages/Account.jsx";
import ChatList from "./pages/ChatList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import BottomNavBar from "./pages/BottomNavBar.jsx";
import AddAuction from "./pages/AddAuction.jsx";
import {lazy, useEffect, useState} from "react";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AuctionDetail from "./pages/AuctionDetail.jsx";
import {useSelector,useDispatch} from "react-redux";
import AuctionChat from "./pages/AuctionChat.jsx";
import axios from "axios";
import {changeEmail, changeNickname,isLogin,isJwt,showBottomNav,changeIdx} from "./store.jsx";

const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [showBottom, setShowBottom] = useState(false);
    //토큰을 확인하고 유효하면 Home으로 아니면 로그인 페이지 이동

    useEffect(() => {
        if(location.pathname === "/login" || location.pathname === "/register" || /^\/chat(\/.*)?$/.test(location.pathname)) {
            setShowBottom(false);
        }else {
            setShowBottom(true);
        }
            axios.get("http://localhost:8080/checkAuth", {withCredentials: true})
                .then((res)=>{
                    // console.log(res);
                    if(res.status === 200){
                        console.log(res);
                        dispatch(isLogin(true));
                        setShowBottom(true);
                        dispatch(changeEmail(res.data.email));
                        dispatch(changeNickname(res.data.nickname));
                        dispatch(changeIdx(res.data.userIdx));
                        navigate("/");
                    }else{
                        dispatch(isLogin(false));
                    }
                }).catch((err)=>{
                //console.log(err);
                dispatch(isLogin(false));
                navigate("/login");
            })
    },[user.isLogin])

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listAuction" element={<Auction />}/>
                <Route path="/chats" element={<ChatList/>}/>
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/signin" element={<Register/>}/>
                <Route path="/addproduct" element={<AddProduct/>}/>
                <Route path="/addauction" element={<AddAuction/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
                <Route path="/chat/:id" element={<Chat/>}/>
                <Route path="/auction/:id" element={<AuctionDetail/>}/>
                <Route path="/auction/chat/:id" element={<AuctionChat/>}/>
            </Routes>
            {showBottom ? <BottomNavBar />:null}



        </div>
    );
};

export default App;
