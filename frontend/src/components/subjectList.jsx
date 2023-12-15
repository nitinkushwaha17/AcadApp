import { useEffect, useState } from "react";
import { Typography, Paper, ListItemButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';

function SubjectListItem({sub}) {
    return (
        <Paper sx={{my:1}}>
            <ListItemButton alignItems="flex-start">
            <ListItemAvatar>
            <Avatar sx={{ bgcolor: deepOrange[500], borderRadius: 1}} variant="square">
            {sub.shortName?sub.shortName:'CN'}
            </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={
                <Typography variant='h6' sx={{textTransform: 'capitalize'}}>
                    {sub.name}
                </Typography>
                }
            secondary={
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {sub.subCode}
                </Typography>
            }
            />
        </ListItemButton>
        </Paper>
    )
}

export default function SubjectList() {
    const [subs, setSubs] = useState([]);

    useEffect(()=>{
        axios.get('/subject')
        .then((resp)=>setSubs(resp.data))
        .catch((err)=>console.log(err))
    }, [])

    return (
        <>
            <Typography variant='h4'>Subjects</Typography>
            {subs.map((sub, idx)=>(
                <SubjectListItem sub={sub.sub} key={idx}/>
            ))}
        </>
    )
}