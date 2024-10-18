import {useEffect, useState} from 'react';
import {
    AppBar,
    Box, Button,
    Card, CardContent,
    CardMedia, createTheme, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const Home = () => {
    const theme = createTheme();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleAddClick = () => {
        navigate("/addproduct")
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        axios.get("http://localhost:8080/showitem",{withCredentials:true})
            .then((res)=>{
                setItems(res.data);
                setIsLoading(false);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, []);
    return(
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Button
                            onClick={handleClick}
                            color="inherit"
                        >
                            <Typography variant="h6">
                                하양읍
                            </Typography>
                            <ExpandMoreIcon/>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                        <IconButton color="inherit" sx={{ marginLeft: 'auto' }}>
                            <SearchIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Toolbar/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1}}>
                {items.map((item) => (
                    <Card key={item.id} sx={{ display: 'flex', alignItems: 'center', padding: 1}}>
                        <CardMedia
                            component="img"
                            sx={{ width: 125, height: 125, objectFit: 'cover' }}
                            image={item.img_url}
                            alt={item.title}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" component="div">
                                {item.itemName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.itemDescription}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                {item.price}원
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
                <IconButton
                    onClick={handleAddClick}
                    sx={{
                        position: 'fixed',
                        bottom: 80,
                        right: 20,
                        backgroundColor: '#1976d2',
                        color: 'white',
                        zIndex: 1,
                        borderRadius: '50%',
                        width: 56,
                        height: 56,
                        '&:hover': {
                            backgroundColor: '#155a8a',
                        },
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Box>
            <Toolbar/>
        </>

    );
};

export default Home;
