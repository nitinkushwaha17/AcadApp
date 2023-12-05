import { useState, useEffect } from "react";
import { Box, Toolbar } from "@mui/material"
import { Container } from "@mui/system";
import { Puff } from  'react-loader-spinner'
import axios from "axios";
import SubsList from "../components/subsList";

export default function JoinSubject(){
    const [subs, setSubs] = useState();
    
    useEffect(()=>{
      axios.get("/add/joinsub")
      .then((res)=>{
        setSubs(res.data);
      })
      .catch((err)=>{console.error(err);})
    }, []);

    return(
            <Container>
            {subs?
                <SubsList subs={subs}/>:
                <Box sx={{ '>*':{justifyContent:'center'}}}>
                <Puff
                    height="100"
                    width="100"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
                </Box>
                }
                <Toolbar />
                <Toolbar />
                <Toolbar />
            </Container>
    )
}