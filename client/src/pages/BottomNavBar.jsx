import React, {useEffect} from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import GavelIcon from '@mui/icons-material/Gavel';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {Link, useLocation} from 'react-router-dom';

const BottomNavBar = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(() => {
        return localStorage.getItem('bottomNavValue') ? parseInt(localStorage.getItem('bottomNavValue')) : 0;
    });
    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setValue(0);
                break;
            case '/auction':
                setValue(1);
                break;
            case '/chats':
                setValue(2);
                break;
            case '/account':
                setValue(3);
                break;
            default:
                setValue(0); // 기본값 설정
                break;
        }
    }, [location.pathname]);
    useEffect(() => {
        localStorage.setItem('bottomNavValue', value);
    }, [value]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            sx={{ width: '100%', position: 'fixed', bottom: 0 }}
        >
            <BottomNavigationAction
                component={Link}
                to="/"
                label="홈"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                component={Link}
                to="/auction"
                label="경매"
                icon={<GavelIcon/>}
            />
            <BottomNavigationAction
                component={Link}
                to="/chats"
                label="채팅"
                icon={<ChatIcon/>}
            />
            <BottomNavigationAction
                component={Link}
                to="/account"
                label="내 정보"
                icon={<PermIdentityIcon/>}
            />
        </BottomNavigation>
    );
};

export default BottomNavBar;
