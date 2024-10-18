
import {Routes, Route, useNavigate} from "react-router-dom"

import Home from "./pages/Home.jsx";
import Auction from "./pages/Auction.jsx";
import Account from "./pages/Account.jsx";
import Chats from "./pages/Chats.jsx";
import SignUp from "./pages/Signup.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import BottomNavBar from "./pages/BottomNavBar.jsx";
import AddAuction from "./pages/AddAuction.jsx";
import {useEffect, useState} from "react";
import SignIn from "./pages/SignIn.jsx";
import axios from "axios";
import {getCookie, removeCookie} from "./Cookie.js";
import {useSelector,useDispatch} from "react-redux";
import {changeEmail, changeName} from "./store.jsx";


const App = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    let dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('jwt');
            if(token){
                axios.get("http://localhost:8080/my-page",{withCredentials:true})
                    .then((response) => {
                        const data = response.data;
                        console.log(data.username)
                        dispatch(changeName(data.username));
                        dispatch(changeEmail(data.userEmail));
                        setIsLogin(true);
                    })
                    .catch((error) => {
                        setIsLogin(false);
                        navigate("/signup");
                        console.log(error.response);
                    })
            }else{
                setIsLogin(false);
                navigate("/signup");
            }
    }, [isLogin,navigate]);
    const showBottomNav = isLogin && !["/signin", "/signup"].includes(location.pathname);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auction" element={<Auction />}/>
                <Route path="/chats" element={<Chats/>}/>
                <Route path="/account" element={<Account />} />
                <Route path="/signup" element={<SignUp setIsLogin={setIsLogin}/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/addproduct" element={<AddProduct/>}/>
                <Route path="/addauction" element={<AddAuction/>}/>
            </Routes>
            {showBottomNav && <BottomNavBar />} {/* 조건부 렌더링 */}

        </div>
    );
};

export default App;
