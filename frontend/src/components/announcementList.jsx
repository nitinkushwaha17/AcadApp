import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Paper, Stack, Typography } from "@mui/material";
import PostsListItem from "./postsListItem";
import { Link } from "react-router-dom";

export default function AnnouncementList() {
    const [posts, setPosts] = useState([]);
    
    useEffect(()=>{
      axios.get(`/posts/?lastpostdate=${new Date().toISOString()}&limit=3`)
      .then((res)=>{
        setPosts(res.data);
      })
      .catch((err)=>{console.error(err);})
    }, []);

  return (
    <>
        <Box sx={{maxWidth: '500px' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant="h4">Announcements</Typography>
            <Typography variant="body1" component={Link} to='/post' sx={{textDecoration: 'none', color:'primary.dark'}}>See all</Typography>
        </Stack>
        {posts.map((post, idx)=>(
            <Paper key={idx} sx={{my:1}}>
            <PostsListItem post={post}/>
            </Paper>
        ))}
        </Box>
    </>
  )
}
