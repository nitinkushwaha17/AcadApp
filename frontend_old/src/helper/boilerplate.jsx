import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import Navbar from "../components/navbar"
import Drawer from "../components/drawer"

export default function PrivateRoute(){
    return (
        <>
            <Navbar />
            <Box component="main" sx={{ display: 'flex' }}>
                <Drawer />
                <Outlet sx={{flexGrow: 1}}/>
            </Box>
        </>
    )
}