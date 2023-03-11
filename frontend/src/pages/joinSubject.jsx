import { useState, forwardRef, useContext, useEffect } from "react";
import { Box, Toolbar, useTheme, useMediaQuery, Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material"
import PostList from "../components/postsList"
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
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Toolbar />
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
        </Box>
    )
}