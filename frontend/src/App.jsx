import {useEffect, createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar, Alert } from '@mui/material';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import './App.css';
import Profile from './pages/profile';
import Login from './pages/login';
import NewPost from './pages/newPost';
import Add from './pages/add';
import Posts from './pages/posts';
import PrivateRoute from './helper/auth/PrivateRoute';
import axios from 'axios';
import Boilerplate from "./helper/boilerplate"
import Post from './pages/post';
import JoinSubject from './pages/joinSubject';
import Setting from './pages/setting';
import { useSelector, useDispatch } from 'react-redux';
import { close } from './features/snackbarSlice';

const darkTheme = createTheme({
  // palette: {
  //   mode: 'dark',
  //   primary: {
  //     main: '#1b4e8f',
  //   },
  //   secondary: {
  //     main: '#2ec5d3',
  //   },
  //   background: {
  //     default: '#192231',
  //     paper: '#24344d',
  //   },
  // },
});

const UserContext = createContext(null);

function App() {
  console.log(darkTheme)
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://192.168.0.106:3000';
  }
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [open, setOpen] = useState(false);
  const open = useSelector(state => state.snackbar.open)
  const message = useSelector(state => state.snackbar.message)

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(close());
  };

  useEffect(()=>{
    if(process.env.NODE_ENV !== 'production') {
      axios.get('http://localhost:3000/auth/getUser')
      .then(function (response) {
          // handle success
          console.log(response);
          setUser(response.data);
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
      .finally(()=>{
        setLoading(false);
      })
    }
    else{
      axios.get('/auth/getUser')
      .then(function (response) {
          // handle success
          console.log(response);
          setUser(response.data);
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
      .finally(()=>{
        setLoading(false);
      })
    }
    
  }, [])

  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Boilerplate />}>
            <Route index element={<Posts />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="posts" element={<Posts />} /> */}
            <Route path="post" element={<Posts />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="join" element={<JoinSubject />} />
          </Route>
            <Route path="settings" element={<Setting />} />
            <Route path="new" element={<NewPost />} />
            <Route path="add" element={<Add />} />
        </Route>
      </Route>
    )
  );

  if(loading) return <p>Loading...</p>

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserContext.Provider value={user}>
        <RouterProvider router={router} />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
export {UserContext};
