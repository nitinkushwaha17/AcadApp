import { useState, useEffect } from "react";
import { Button, TextField, CircularProgress, Autocomplete } from "@mui/material";
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { show } from '../features/snackbarSlice';

export default function AddProf(){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [depts, setDepts] = useState([]);
    const loading = open && depts.length === 0;

    useEffect(()=>{

        if(loading) {
            return;
        }

        (async()=>{
            axios.get('/add/dept')
            .then((res) => {
                console.log(res);
                setDepts(res.data);
            })
        })();

    }, [loading])

    const formik = useFormik({
        initialValues: {
          name: '',
          shortName: '',
          dept: ''
        },
        onSubmit: (values) => {
          console.log(values);
          axios.post('/add/prof', values)
          .then((response)=>{
            console.log(response);
            dispatch(show("Prof added successfully"));
          }).catch((err) => {
            console.log(err);
          })
        },
    });

    return(
        <>
            <TextField 
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            <TextField 
                id="short name"
                name="shortName"
                label="Short name"
                value={formik.values.shortName}
                onChange={formik.handleChange}
            />
            <Autocomplete
                id="select-prof"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                // onClick={fetchData}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                getOptionLabel={(option) => option.name||''}
                options={depts}
                filterSelectedOptions
                value={formik.values.dept}
                onChange={(_, val)=>{formik.setFieldValue('dept', val)}}
                loading={loading}
                // PaperComponent={(props)=>(
                //     <Paper {...props}>
                //         <h1>Hello</h1>
                //         {props.children}
                //     </Paper>
                // )}
                renderInput={(params) => (
                    <TextField
                    {...params}    
                    label="Select Dept"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </>
                        ),
                    }}
                    />
                )}
            />
            <Button onClick={formik.handleSubmit}>Submit</Button>
        </>
    )
}