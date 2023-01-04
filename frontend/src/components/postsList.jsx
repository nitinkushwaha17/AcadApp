import { Typography, Chip, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';

export default function PostsList() {
  return (
    <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <>
              <Typography
                variant="caption"
                color="text.primary"
              >
                5:15PM 14 Feb
              </Typography>
              <br />
              <Typography variant='caption'>Last updated - 3:30PM 15 Feb</Typography>
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
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        />
      </ListItemButton>
    </List>
  );
}