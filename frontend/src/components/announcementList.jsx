import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Paper, Stack, Typography } from "@mui/material";
import PostsListItem from "./postsListItem";
import { Link } from "react-router-dom";
import { PostSkeletonLoader } from "./postSkeletonLoader";

export default function AnnouncementList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
      axios.get(`/posts/?lastpostdate=${new Date().toISOString()}&limit=3`)
      .then((res)=>{
        setPosts(res.data);
      })
      .catch((err)=>{console.error(err)})
      .finally(()=>setLoading(false))
    }, []);

  return (
    <>
        <Box>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant="h4">Announcements</Typography>
            <Typography variant="body1" component={Link} to='/post' sx={{textDecoration: 'none', color:'primary.dark'}}>View all</Typography>
        </Stack>
        {loading?
        (
            <PostSkeletonLoader num={3} />
        ):
        posts.map((post, idx)=>(
          <PostsListItem post={post} key={idx} sx={{my:1}}/>
        ))}
        </Box>
    </>
  )
}
