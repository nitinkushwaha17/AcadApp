import { useFormik } from 'formik';
import { Button, Container, TextField, Typography, Box, Autocomplete, Stack } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState} from 'react';
import axios from 'axios';
import AddDept from '../components/addDept';
import AddSubject from '../components/addSubject';
import AddProf from '../components/addProf';
import AddTag from '../components/addTag';

const tags = [
  {
    title: 'Urgent',
    value: 0,
  },
  {
    title: 'Info',
    value: 1,
  },
  {
    title: 'Cancelled',
    value: 2,
  },
  {
    title: 'Extra class',
    value: 3
  }
]

const addVal = ['Subject', 'Tag', 'Session', 'Department', 'Prof']

const NewPost = () => {

  const [add, setAdd] = useState();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '# Hello',
      tags: []
    },
    onSubmit: (values) => {
      console.log(values);
      // axios.post('/posts', values)
      // .then((response)=>{
      //     console.log(response);
      // }).catch((err) => {
      //     console.log(err);
      // })
    },
  });

  const [preview, setPreview] = useState(false);
  // const [options, setOptions] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   axios.get('/subjects')
  //   .then((subjects) => {
  //     console.log(subjects)
  //     setOptions(subjects.data);
  //   }).catch((err) => {
  //     console.log(err);
  //   }).finally(()=>setLoading(false));

  // }, []);

  return (
    <Container sx={{p: 5, maxWidth: '500px'}}>
        <Stack direction={'row'} gap={3}>
        <Typography variant='h3' >Add</Typography>
        <Autocomplete
          sx={{width: '50%', maxWidth: '300px'}}
          // id="tags-outlined"
          options={addVal}
          filterSelectedOptions
          onChange={(_, val)=>{setAdd(val)}}
          renderInput={(params) => (
            <TextField
              {...params}
              value={add}
              variant="standard"
              label="filterSelectedOptions"
              placeholder="Tags"
            />
          )}
        />
        </Stack>
        {add==='Department'?<AddDept />:
        add==='Subject'?<AddSubject />:
        add==='Prof'?<AddProf />:
        add==='Tag'?<AddTag />:
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
          multiple
          id="tags-outlined"
          options={tags}
          getOptionLabel={(option) => option.title}
          filterSelectedOptions
          isOptionEqualToValue={(option, value) => option.title === value.title}
          onChange={(_, value) => formik.setFieldValue("tags", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={formik.values.tags}
              label="filterSelectedOptions"
              placeholder="Tags"
            />
          )}
        />
        {/* <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option === value}
          getOptionLabel={(option) => option}
          options={options}
          // loading={loading}
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
        /> */}
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{mt: 5}}>
            Submit
        </Button>
        </form>}
    </Container>
  );
};

export default NewPost;
