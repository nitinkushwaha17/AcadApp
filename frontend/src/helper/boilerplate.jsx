import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import BottomNav from "../components/bottomNav";
import { Toolbar, useMediaQuery } from "@mui/material";

export default function Boilerplate(){
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <>
            <Navbar />
            <Box component="main" sx={{ display: 'flex' }}>
                <Sidebar />
                {!mdUp &&
                (<BottomNav />)}
                <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                    <Toolbar />
                    <Outlet sx={{flexGrow: 1}} />
                </Box>
            </Box>
        </>
    )
}