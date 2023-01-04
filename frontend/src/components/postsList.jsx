import { Typography, Chip, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';

export default function PostsList({posts}) {
  posts.forEach((post)=>{
    let date_created = new Date(post.createdAt);
    let date_updated = new Date(post.updatedAt);

    post.createdAt = date_created.toLocaleString('en-IN', { timeZone: 'UTC' }).split(', ')[1] + ", " + date_created.toDateString().substring(8, 10)+" "+date_created.toDateString().substring(4, 7);
    post.updatedAt = date_updated.toLocaleString('en-IN', { timeZone: 'UTC' }).split(', ')[1] + ", " + date_updated.toDateString().substring(8, 10)+" "+date_updated.toDateString().substring(4, 7);
  })
  return (
    <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
    {console.log(posts)}
      {posts.map((post)=>(
        <>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={post.title}
            secondary={
              <>
                <Typography
                  variant="caption"
                  color="text.primary"
                >
                  {post.createdAt}
                </Typography>
                <br />
                <Typography variant='caption'>Last updated - {post.updatedAt}</Typography>
                <br />
                <Chip label="Urgent" color="error" size="small"/>
                <Chip label="Info" color="primary" size="small"/>
                <Chip label="Cancelled" color="success" size="small"/>
                <Chip label="Extra class" color="warning" size="small"/>
              </>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        </>
      ))}
      </List>
  );
}