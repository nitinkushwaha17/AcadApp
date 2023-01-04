import { Typography, Chip, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';

export default function PostsList({posts}) {
  return (
    <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
      {posts.forEach((post)=>(
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
                  {posts.createdAt}
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