import { Typography, Chip, Stack, List, Paper, Box, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';

export default function AssignmentListItem({post}) {
  return (
    <Paper sx={{my:1}}>
        <ListItemButton onClick={()=>{navigate(`/post/${post._id}`)}} alignItems="flex-start">
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: deepOrange[500], borderRadius: 1}} variant="square">
          {post.subject?post.subject.shortName?post.subject.shortName:'CN':'CN'}
        </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack justifyContent='space-between' direction='row'>
              <Typography variant='h6' sx={{textTransform: 'capitalize'}}>
                {post.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {formatDate(post.createdAt)}
              </Typography>
            </Stack>
            }
          secondary={
            <>
              <Stack justifyContent='space-between' direction='row' my={1} gap={2}>
                <Typography variant='caption'>Deadline: {formatDate(post.createdAt)}</Typography>
                <Chip variant="outlined" sx={{border: 'none'}} color="primary" size="small" avatar={<Avatar src={post.author.image} />} label={post.author.name}/>
              </Stack>
              <Box my={0.5}></Box>
            </>
          }
        />
      </ListItemButton>
    </Paper>
  )
}