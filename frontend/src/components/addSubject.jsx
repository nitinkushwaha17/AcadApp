import { useEffect, useState } from 'react';
import { Autocomplete, TextField, Paper, CircularProgress, Button } from "@mui/material";
import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { show } from '../features/snackbarSlice';

export default function AddSubject(){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [profs, setProfs] = useState([]);
    const loading = open && profs.length === 0;

    const formik = useFormik({
        initialValues: {
          name: '',
          shortName: '',
          subCode: '',
          sem: '',
          sec: '',
          credits: '',
          profs: []
        },
        onSubmit: (values) => {
          console.log(values);
          const profs=[];
          values.profs.forEach((value) => {
            profs.push(value._id);
          })
          console.log(values);
          axios.post('/add/subject', {...values, profs})
          .then((response)=>{
            console.log(response);
            dispatch(show('Subject created successfully'))
          }).catch((err) => {
              console.log(err);
          })
        },
    });

    useEffect(()=>{

        if(loading) {
            return;
        }

        (async()=>{
            axios.get('/add/prof')
            .then((res) => {
                console.log(res);
                setProfs(res.data);
            })
        })();

    }, [loading])

    return(
        <>
            <TextField
                name='subCode'
                label="Subcode"
                value={formik.values.subCode}
                onChange={formik.handleChange}
            />
            <TextField 
                name='name'
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            <TextField
                name='shortName'
                label="Short name"
                value={formik.values.shortName}
                onChange={formik.handleChange}
            />
            <TextField
                name='sem'
                label="Sem" 
                type="number"
                value={formik.values.sem}
                onChange={formik.handleChange}
            />
            <TextField
                name='sec'
                label="Sec"
                value={formik.values.sec}
                onChange={formik.handleChange}
            />
            <TextField
                name='credits'
                label="Credits"
                type="number"
                value={formik.values.credits}
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
                multiple
                isOptionEqualToValue={(option, value) => option._id === value._id}
                getOptionLabel={(option) => option.name}
                options={profs}
                filterSelectedOptions
                loading={loading}
                value={formik.values.profs}
                onChange={(_, val)=>{formik.setFieldValue('profs', val)}}
                // PaperComponent={(props)=>(
                //     <Paper {...props}>
                //         <h1>Hello</h1>
                //         {props.children}
                //     </Paper>
                // )}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Select Profs"
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