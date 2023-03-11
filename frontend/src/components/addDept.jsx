import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import axios from 'axios'

export default function AddDept(){
    const formik = useFormik({
        initialValues: {
          name: '',
          shortName: '',
        },
        onSubmit: (values) => {
          console.log(values);
          axios.post('/add/dept', values)
          .then((response)=>{
              console.log(response);
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
            <Button onClick={formik.handleSubmit}>Submit</Button>
        </>
    )
}