import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header/header';
import Home from './components/home/home';
import CreatePost from './components/create/createPost';
import DetailView from './components/details/DetailView';
import Login from './components/account/Login';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Update from './components/create/update';
import BlogItPage from './components/blogitpage';
import DataProvider from './context/DataProvider'; // Import DataProvider

const PrivateRoute = ({ isAuthenticated }) => {
    const token = sessionStorage.getItem('accessToken');
    return isAuthenticated && token ? (
        <>
            <Header />
            <Outlet />
        </>
    ) : (
        <Navigate replace to='/account' />
    );
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <DataProvider>
            <BrowserRouter>
                <Box style={{ marginTop: 64 }}>
                    <Routes>
                        <Route path='/account' element={<Login isUserAuthenticated={setIsAuthenticated} />} />
                        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            <Route path='/' element={<Home />} />
                            <Route path='/create' element={<CreatePost />} />
                            <Route path='/details/:id' element={<DetailView />} />
                            <Route path='/update/:id' element={<Update />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/Blog-It' element={<BlogItPage />} />
                        </Route>
                    </Routes>
                </Box>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
