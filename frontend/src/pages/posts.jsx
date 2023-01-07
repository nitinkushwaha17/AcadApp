import { useState, forwardRef, useMemo, useContext } from "react";
import { Box, Toolbar, useTheme, useMediaQuery, Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { Link as RouterLink, useLoaderData } from "react-router-dom"
import Navbar from "../components/navbar"
import Drawer from "../components/drawer"
import PostList from "../components/postsList"
import { Container } from "@mui/system";
import {UserContext} from "../App"

export default function Posts(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [value, setValue] = useState(0);
    const Link = forwardRef(function Link(itemProps, ref) {
        return <RouterLink ref={ref} {...itemProps} role={undefined} />;
    });
    
    let posts=useLoaderData();

    const user = useContext(UserContext);
    
    useMemo(()=>{posts.forEach((post)=>{
      let date_created = new Date(post.createdAt);
      let date_updated = new Date(post.updatedAt);
      
      if(user.last_request.post<post.updatedAt){
        post.isUnread = true;
      }

      post.dateCreated = date_created.toLocaleString('en-IN').split(', ')[1] + ", " + date_created.toDateString().substring(8, 10)+" "+date_created.toDateString().substring(4, 7);
      post.dateUpdated = date_updated.toLocaleString('en-IN').split(', ')[1] + ", " + date_updated.toDateString().substring(8, 10)+" "+date_updated.toDateString().substring(4, 7);
    })}, [posts, user.last_request.post]);

    let unreadCount = 0;
    posts.forEach((post)=>{
      unreadCount+=(post.isUnread?1:0);
    });

    return(
    <Box sx={{ display: 'flex' }}>
    <Navbar />
        {matches?<Drawer /> : <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1}} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/test" label="Announcements" icon={
            <Badge badgeContent={unreadCount} color="primary">
              <RestoreIcon />
            </Badge>}
          />
          <BottomNavigationAction label="Assignments" icon={<RestoreIcon />} />
          <BottomNavigationAction component={Link} to="/new" label="Class Schedule" icon={<Badge badgeContent={4} color="primary"><RestoreIcon /></Badge>} />
          
        </BottomNavigation>
      </Paper>}
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Toolbar />
            <Container>
                <PostList posts={posts}/>
            </Container>
        </Box>
    </Box>
    )
}