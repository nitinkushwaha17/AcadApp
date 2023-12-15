import { List, ListItemButton, ListItemText, Paper, Skeleton } from "@mui/material"

export const PostSkeletonLoader = ({ num=1 }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 960 }}>
        {[...Array(num)].map((e, i)=>(
        <Paper key={i} sx={{my:1}}>
            <ListItemButton>
            <Skeleton variant="rectangular" width={40} height={40} sx={{marginRight:2}} />
            <ListItemText
                primary={<Skeleton/>}
                secondary={<Skeleton/>}
            ></ListItemText>
            </ListItemButton>
        </Paper>
        ))}
    </List>
  )
}