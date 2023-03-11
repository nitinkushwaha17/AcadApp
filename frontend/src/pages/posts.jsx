import { useState, forwardRef, useContext, useEffect } from "react";
import { Box, Toolbar, useTheme, useMediaQuery, Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { Link as RouterLink } from "react-router-dom"
import Navbar from "../components/navbar"
import Drawer from "../components/drawer"
import PostList from "../components/postsList"
import { Container } from "@mui/system";
import {UserContext} from "../App"
import { Puff } from  'react-loader-spinner'
import axios from "axios";

export default function Posts(){
    const [posts, setPosts] = useState();
    
    useEffect(()=>{
      axios.get("/posts")
      .then((res)=>{
        setPosts(res.data);
      })
      .catch((err)=>{console.error(err);})
    }, []);

    const user = useContext(UserContext);
    
    if(posts)
    posts.forEach((post)=>{
      let date_created = new Date(post.createdAt);
      let date_updated = new Date(post.updatedAt);
      
      if(user.last_request.post<post.updatedAt){
        post.isUnread = true;
      }

      post.dateCreated = date_created.toLocaleString('en-IN').split(', ')[1] + ", " + date_created.toDateString().substring(8, 10)+" "+date_created.toDateString().substring(4, 7);
      post.dateUpdated = date_updated.toLocaleString('en-IN').split(', ')[1] + ", " + date_updated.toDateString().substring(8, 10)+" "+date_updated.toDateString().substring(4, 7);
    })

    let unreadCount = 0;
    if(posts)
    posts.forEach((post)=>{
      unreadCount+=(post.isUnread?1:0);
    });

    return(
    // <Box sx={{ display: 'flex' }}>
    // <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Toolbar />
            <Container>
            {posts?
              <PostList posts={posts}/>:
              <Box sx={{ '>*':{justifyContent:'center'}}}>
                <Puff
                  height="100"
                  width="100"
                  radius={1}
                  color="#4fa94d"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </Box>
              }
              <Toolbar />
              <Toolbar />
              <Toolbar />
            </Container>
        </Box>
    // </Box>
    )
}