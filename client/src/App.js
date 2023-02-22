import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from "./pages/profile";
import './App.css'
import Menu from "./components/menu/menu";
import Login from "./pages/login";
import Register from "./pages/register";
import {useCookies} from "react-cookie";

const App = () => {
    const {cookie} = useCookies()

    return (
        <BrowserRouter>
        <div className={'container-fluid main'}>
            <div className={'row'}>
                <div className={'menu col-lg-2'}>
                    <Menu />
                </div>
                <div className={'col-lg-10'}>

                        <Routes>
                            <Route path={'/'} element={<Profile />} />
                            <Route path={'/login/'} element={<Login />} />
                            <Route path={'/register'} element={<Register />} />
                            <Route path={'/profile/:login'} element={<Profile />} />
                        </Routes>

                </div>
            </div>
        </div>
        </BrowserRouter>
    );
};

export default App;