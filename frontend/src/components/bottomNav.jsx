import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';

export default function BottomNav(){
    const [value, setValue] = useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={3}>
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
    </Paper>
  )
} 