import { Button, Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

export default function Login(){
    const user = useContext(UserContext);
    useEffect(()=>{
        console.log(user);
    }, [user]);
    return(
        <Box component="span" sx={{ width: '100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
            <Typography variant="h2">Login</Typography>
            <Button href="/auth/login" variant="contained" startIcon={
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="google logo" height={25}></img>}
                sx={{'&:hover':{'color': 'white'}, backgroundColor: 'white', color: "primary.main", boxShadow: 5, m:5}}>
                Login with google
            </Button>
        </Box>
    )
}