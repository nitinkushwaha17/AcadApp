import { useFormik } from 'formik';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import axios from 'axios';

const NewPost = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '# Hello',
    },
    onSubmit: (values) => {
        axios.post('/posts', values)
        .then((response)=>{
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    },
  });

  const [preview, setPreview] = useState(false);

  return (
    <Container sx={{p: 5}}>
        <Typography variant='h3'>New Assigment</Typography>
        <form onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
        />
        <Button onClick={()=>{setPreview(!preview)}}>preview</Button>
        <Box sx={{maxHeight: '50vh', overflowY: 'scroll'}}>
            {!preview?
            <TextField
                fullWidth
                id="content"
                name="content"
                label="Content"
                type="text"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                multiline
            />:
            <Box sx={{border: '1px solid grey', p:2}}><ReactMarkdown children={formik.values.content} /></Box>}
        </Box>
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{mt: 5}}>
            Submit
        </Button>
        </form>
    </Container>
  );
};

export default NewPost;
