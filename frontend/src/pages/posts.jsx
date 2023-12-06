import { useState, forwardRef, useContext, useEffect, useCallback } from "react";
import { Box, List, Toolbar, ListItemButton,Typography,ListItemText, ListItemAvatar, Skeleton, Avatar, useTheme, useMediaQuery, Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { Link as RouterLink } from "react-router-dom"
import Navbar from "../components/navbar"
import Drawer from "../components/drawer"
import PostList from "../components/postsList"
import { Container } from "@mui/system";
import {UserContext} from "../App"
import { Puff } from  'react-loader-spinner'
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const getInitialPosts = ()=>{
      axios.get(`/posts/?lastpostdate=${new Date().toISOString()}&limit=10`)
      .then((res)=>{
        setPosts(res.data);
        if(res.data.length<10) setHasMore(false);
      })
      .catch((err)=>{console.error(err);})
    }
    
    useEffect(()=>{
      getInitialPosts();
    }, []);

    const fetchData = () =>{
      axios.get(`/posts/?lastpostdate=${posts?posts[posts.length-1].updatedAt:new Date().toISOString()}`)
      .then((res)=>{
        console.log(res.data);
        setPosts([...posts, ...res.data]);
        if(res.data.length<5) setHasMore(false);
      })
      .catch((err)=>{console.error(err);})
    }

    const refresh = () => {
      setPosts([]);
      getInitialPosts();
    }

    const user = useContext(UserContext);
    
    if(posts)
    posts.forEach((post)=>{
      let date_created = new Date(post.createdAt);
      // let date_updated = new Date(post.updatedAt);
      
      if(user.last_request.post<post.updatedAt){
        post.isUnread = true;
      }

      post.dateCreated = date_created.toDateString().substring(8, 10)+" "+date_created.toDateString().substring(4, 7);
      // post.dateCreated = date_created.toLocaleString('en-IN').split(', ')[1] + ", " + date_created.toDateString().substring(8, 10)+" "+date_created.toDateString().substring(4, 7);
      // post.dateUpdated = date_updated.toLocaleString('en-IN').split(', ')[1] + ", " + date_updated.toDateString().substring(8, 10)+" "+date_updated.toDateString().substring(4, 7);
    })

    let unreadCount = 0;
    if(posts)
    posts.forEach((post)=>{
      unreadCount+=(post.isUnread?1:0);
    });

    return(
      <Container>
      <Typography variant="h4" sx={{my: 1}}>Posts</Typography>
      {posts?
        <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper', p:0 }}>
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={
              <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
              {[...Array(10)].map((e, i)=>(
                <ListItemButton key={i}>
                  <Skeleton variant="rectangular" width={40} height={40} sx={{marginRight:2}} />
                  <ListItemText
                    primary={<Skeleton/>}
                    secondary={<Skeleton/>}
                  ></ListItemText>
                </ListItemButton>
              ))}
              </List>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={()=>{refresh();console.log('refresh')}}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
          >
            <PostList posts={posts}/>
          </InfiniteScroll>
        </List>
        :
        <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
          <ListItemButton>
            <Skeleton variant="rectangular" width={40} height={40} sx={{marginRight:2}} />
            <ListItemText
              primary={<Skeleton/>}
              secondary={<Skeleton/>}
            ></ListItemText>
          </ListItemButton>
        </List>
      }
        <Toolbar />
        <Toolbar />
      </Container>
    )
}