import { Typography, Chip, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function PostsList({posts}) {
  const navigate = useNavigate();
  return (
    <>
    {console.log(posts)}
      {posts.map((post)=>(
        <>
        <ListItemButton onClick={()=>{navigate(`/post/${post._id}`)}} alignItems="flex-start" sx={post.isUnread?{backgroundColor: (theme)=>(theme.palette.grey[800])}:{}}>
          <ListItemAvatar>
          <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
            {post.subject?post.subject.shortName?post.subject.shortName:'CN':'CN'}
          </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={post.title}
            secondary={
              <>
                <Typography
                  variant="caption"
                  color="text.primary"
                >
                  {post.dateCreated}
                </Typography>
                <br />
                <Typography variant='caption'>Last updated - {post.dateUpdated}</Typography>
                <br />
                {post.tags?post.tags.sort().map((tag)=>(
                  <Chip label={tag.name} sx={{backgroundColor: `${tag.color?tag.color:'#acf'}`}}
                    size="small"
                  />
                )):null}
              </>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        </>
      ))}
      </>
  );
}