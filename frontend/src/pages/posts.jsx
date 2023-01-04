import { useState, forwardRef } from "react";
import { Box, Toolbar, useTheme, useMediaQuery, Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { Link as RouterLink, useLoaderData } from "react-router-dom"
import Navbar from "../components/navbar"
import Drawer from "../components/drawer"
import PostList from "../components/postsList"
import { Container } from "@mui/system";

export default function Posts(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [value, setValue] = useState(0);
    const Link = forwardRef(function Link(itemProps, ref) {
        return <RouterLink ref={ref} {...itemProps} role={undefined} />;
    });
    let data=useLoaderData();
    console.log(data);

    return(
    <Box sx={{ display: 'flex' }}>
    <Navbar />
        {matches?<Drawer /> : <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/test" label="Announcements" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Assignments" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Class Schedule" icon={<Badge badgeContent={4} color="primary"><RestoreIcon /></Badge>} />
          
        </BottomNavigation>
      </Paper>}
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Toolbar />
            <Container>
                <PostList />
            </Container>
        </Box>
    </Box>
    )
}