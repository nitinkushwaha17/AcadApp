import { Button, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';

export default function SubsList({subs}) {

  const join = (subId)=>{
    axios.post(`/add/join/${subId}`)
    .then((response)=>console.log(response))
    .catch((error)=>console.error(error))
  }

  return (
    <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
    {console.log(subs)}
      {subs.map((sub)=>(
        <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
              {sub.shortName}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${sub.name} - ${sub.sec}`}
            secondary={
              <>
                <Typography variant='body1'>{sub.subCode}</Typography>
                <Typography variant='body1'>Prof: {sub.profs.map((e, i)=>(i===0?`${e.name}`:`, ${e.name}`))}</Typography>
              </>
            }
          />
          <Button variant="contained" onClick={()=>{join(sub._id)}}>Join</Button>
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
      ))}
      </List>
  );
}