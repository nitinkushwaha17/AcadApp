import { useEffect, useState } from "react";
import { Container, Switch, Typography, FormGroup, FormControlLabel } from "@mui/material";
import { Puff } from  'react-loader-spinner'
import axios from 'axios';

export default function Setting(){
    const [values, setValues] = useState({notif: false});
    const [loading, setLoading] = useState(true); 

    const handleChange = (event) => {
        setValues(...values, {notif: event.target.checked});
        axios.post('settings/notif', {notif: event.target.checked});
    }

    useEffect(()=>{
        axios.get('settings/get')
        .then((response)=>{
            console.log(response.data);
            setValues(response.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.error(error);
        })
    }, []);

    return(
        <Container sx={{p: 5}}>
            <Typography variant="h3">Settings</Typography>
            {!loading?
            <FormGroup>
                <FormControlLabel control={
                    <Switch
                        checked={values.notif}
                        onChange={handleChange}
                    />
                } label="Notifications" />
            </FormGroup>
            :
            <Puff
                height="100"
                width="100"
                radius={1}
                color="#4fa94d"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />}
        </Container>
    )
}