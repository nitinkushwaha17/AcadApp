import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { useState, forwardRef } from "react";
import { useTheme, useMediaQuery, Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { Link as RouterLink } from "react-router-dom"
// import Navbar from "../components/navbar"

const drawerWidth = 240;

export default function ClippedDrawer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [value, setValue] = useState(0);
    const Link = forwardRef(function Link(itemProps, ref) {
        return <RouterLink ref={ref} {...itemProps} role={undefined} />;
    });
  return (
    <>
    {matches? 
      <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[['Announcements', '/post'], ['Assignments', '/'], ['New', '/new']].map((ele, index) => (
            <ListItem component={Link} to={ele[1]} key={ele[0]} disablePadding>
            {/* <Link to="/post"> */}
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={ele[0]} />
              </ListItemButton>
              {/* </Link> */}
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Box>
    </Drawer>
    : 
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1}} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/post" label="Announcements" icon={
            <Badge badgeContent={/*unreadCount*/4} color="primary">
              <RestoreIcon />
            </Badge>}
          />
          <BottomNavigationAction label="Assignments" icon={<RestoreIcon />} />
          <BottomNavigationAction component={Link} to="/new" label="Class Schedule" icon={<Badge badgeContent={4} color="primary"><RestoreIcon /></Badge>} />
          
        </BottomNavigation>
      </Paper>}
    </>
  )
}