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
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google logo" height={25}></img>}
                sx={{backgroundColor: 'white'}}>
                Login with google
            </Button>
        </Box>
    )
}