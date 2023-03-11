import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import axios from 'axios'

export default function AddTag(){
    const formik = useFormik({
        initialValues: {
          name: '',
          color: '',
        },
        onSubmit: (values) => {
          console.log(values);
          axios.post('/add/tag', values)
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
                id="color"
                name="color"
                label="Color"
                value={formik.values.color}
                onChange={formik.handleChange}
            />
            <Button onClick={formik.handleSubmit}>Submit</Button>
        </>
    )
}