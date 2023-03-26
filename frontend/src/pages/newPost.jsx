import { useFormik } from 'formik';
import { Button, Container, TextField, Typography, Box, Autocomplete, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { show } from '../features/snackbarSlice';

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '# Hello',
      tags: [],
      subject: ''
    },
    onSubmit: (values) => {
      console.log(values);
      let tags = values.tags.map(tag => tag._id);
      let subject = values.subject._id;
      console.log(tags);
      axios.post('/posts', {...values, tags, subject})
      .then((response)=>{
          console.log(response);
          dispatch(show("Post created successfully"));
          navigate('/post');
      }).catch((err) => {
          console.log(err);
      })
    },
  });

  const [preview, setPreview] = useState(false);
  const [open, setOpen] = useState(false);
  const [subs, setSubs] = useState([]);
  const loading = open && subs.length === 0;

  const [openT, setOpenT] = useState(false);
  const [tags, setTags] = useState([]);
  const loadingT = openT && tags.length === 0;

  useEffect(() => {
    if(!loading) return;

    axios.get('/add/subject')
    .then((subjects) => {
      console.log(subjects)
      setSubs(subjects.data);
    }).catch((err) => {
      console.log(err);
    })

  }, [loading]);

  useEffect(() => {
    if(!loadingT) return;

    axios.get('/add/tag')
    .then((tags) => {
      console.log(tags)
      setTags(tags.data);
    }).catch((err) => {
      console.log(err);
    })

  }, [loadingT]);

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
        <Autocomplete
          open={openT}
          onOpen={() => {
            setOpenT(true);
          }}
          onClose={() => {
            setOpenT(false);
          }}
          loading={loadingT}
          multiple
          id="tags-outlined"
          options={tags}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(_, value) => formik.setFieldValue("tags", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              // value={formik.values.tags}
              label="filterSelectedOptions"
              placeholder="Tags"
            />
          )}
        />
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(option) => `${option.shortName} ${option.name}`}
          onChange={(_, value) => formik.setFieldValue("subject", value)}
          options={subs}
          key={(option)=>option._id}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Asynchronous"
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
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{mt: 5}}>
            Submit
        </Button>
        </form>
    </Container>
  );
};

export default NewPost;
