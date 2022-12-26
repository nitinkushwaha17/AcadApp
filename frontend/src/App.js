import {useEffect, createContext, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Home from './pages/home';
import './App.css';
import Profile from './pages/profile';
import Login from './pages/login';
import PrivateRoute from './helper/auth/PrivateRoute';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
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
  }, [])

  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
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
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
export {UserContext};
