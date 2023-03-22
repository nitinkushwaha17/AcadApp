import { useState } from "react";
import { Container, Switch, Typography, FormGroup, FormControlLabel } from "@mui/material";
import axios from 'axios';

export default function Setting(){
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        axios.post('settings/notif', {notif: event.target.checked});
    }

    return(
        <Container sx={{p: 5}}>
            <Typography variant="h3">Settings</Typography>
            <FormGroup>
                <FormControlLabel control={
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                    />
                } label="Notifications" />
            </FormGroup>
        </Container>
    )
}