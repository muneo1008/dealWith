import {Box, Typography} from "@mui/material";

const Intro = () => {
    return(
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#1976d2',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: 'white',
                    position: 'relative',
                    top: '-20%',
                }}
            >
                딜윗
            </Typography>
        </Box>
    );
};
export default Intro;
