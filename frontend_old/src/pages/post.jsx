import { Typography, Box, Toolbar, Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default function Post(){
    const [post, setPost] = useState();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`/posts/${id}`)
        .then((resp)=>{
            setPost(resp.data);
        })
        .catch((error)=>{console.error(error)});
    }, [id])

    return (
        <>
        {post?
        <Box>
        <Toolbar />
        <Container>
        <Typography variant="h2">
            {post.title}
        </Typography>
        <ReactMarkdown children={post.content} /></Container></Box>:<p>Loading...</p>}
        </>
    )
}