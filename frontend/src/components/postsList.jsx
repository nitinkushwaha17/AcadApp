import { Typography, Chip, Stack, List, Box, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

function TagChip(props){
  let { name, color } = props;
  color = color?color:'#5a5cff'
  let bgcolor = color+'25';

  return (
    <Chip label={name} sx={{backgroundColor: `${bgcolor}`, fontWeight:500, border: `1px solid ${color}`, color:`${color}`}} size="small" />
  )
}

export default function PostsList({posts}) {
  const navigate = useNavigate();
  return (
    <>
    {/* {console.log(posts)} */}
      {posts.map((post)=>(
        <>
        <ListItemButton onClick={()=>{navigate(`/post/${post._id}`)}} alignItems="flex-start" sx={post.isUnread?{backgroundColor: `#828DF81f`}:{}}>
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
                  {post.dateCreated}
                </Typography>
              </Stack>
              }
            secondary={
              <>
                {/* <br />
                <Typography variant='caption'>Last updated - {post.dateUpdated}</Typography> */}
                <Stack justifyContent='space-between' direction='row' my={1} gap={2}>
                  <Stack justifyContent='start' gap={0.5} direction='row' flexWrap='wrap'>
                    {post.tags?post.tags.sort().map((tag)=>(
                      <>
                      <TagChip name={tag.name} color={tag.color}/>
                      </>
                    )):<></>}
                  </Stack>
                  <Chip variant="outlined" sx={{border: 'none'}} color="primary" size="small" avatar={<Avatar src={post.author.image} />} label={post.author.name}/>
                </Stack>
                <Box my={0.5}></Box>
                
              </>
            }
          />
        </ListItemButton>
        {/* <Divider variant="" component="li"/> */}
        </>
      ))}
      </>
  );
}