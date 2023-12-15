import { useState, forwardRef, useContext, useEffect, useCallback } from "react";
import { Box, List, Toolbar, ListItemButton,Typography,ListItemText, ListItemAvatar, Skeleton, Avatar, useTheme, useMediaQuery, Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { Link as RouterLink } from "react-router-dom"
import Navbar from "../components/navbar"
import Drawer from "../components/drawer"
import PostListItem from "../components/postsListItem"
import { Container } from "@mui/system";
import {UserContext} from "../App"
import { Puff } from  'react-loader-spinner'
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostSkeletonLoader } from "../components/postSkeletonLoader";
import { formatDate } from "../utils";

export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [isPostUnread, setIsPostUnread] = useState([]);
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
    
    useEffect(()=>{
      let PostUnreadList = [];
      posts.forEach((post)=>{        
        if(user.last_request.post<post.updatedAt){
          PostUnreadList.push(1);
        }
        else PostUnreadList.push(0);  
      })
  
      setIsPostUnread(PostUnreadList);
    }, [posts, user.last_request.post])

    useEffect(()=>{
      let unreadCount = 0;
      for(let idx=0; idx<posts.length; idx++){
        unreadCount+=(isPostUnread[idx]);
      }
    }, [isPostUnread, posts]);

    return(
      <>
      <Typography variant="h4" sx={{mb: 1}}>Posts</Typography>
      {posts?
        <List sx={{ width: '100%', maxWidth: 960, p:0 }}>
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={
              <PostSkeletonLoader num={10} />
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
            {posts.map((post, idx)=>(
              <Paper key={idx} sx={{my:1}}>
                <PostListItem post={post} unread={isPostUnread[idx]} key={idx}/>
              </Paper>
            ))}
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
      </>
    )
}