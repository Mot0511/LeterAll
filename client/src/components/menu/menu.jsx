import React, {useEffect} from 'react';
import cl from './menu.module.css'
import Mybutton from "../mybutton/mybutton";
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {getAuth, signOut} from "firebase/auth";
import login from "../../pages/login";

const Menu = () => {
    const [cookie, setCookie, removeCookie] = useCookies()
    const nav = useNavigate()
    useEffect(() => {
        console.log(cookie)
    }, [])
    const exit = () => {
        
        console.log(cookie);
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                removeCookie('login')
                nav('/login')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={cl.menu}>
            {
                cookie.login
                    ? <a href={`/profile/${cookie.login}`}><Mybutton text={'Профиль'} /></a>
                    : <a href={`/profile/login`}><Mybutton text={'Профиль'} /></a>
            }

            <Mybutton text={'Сообщения'} />
            <Mybutton text={'Друзья'} />

                {
                    cookie.login
                        ? <Mybutton style={{marginTop: '50px'}} onClick={exit} text={'Выйти'} />
                        : <div className={cl.bottom}>
                            <a href={'/login'}><Mybutton text={'Войти'} /></a>
                            <a href={'/register'}><Mybutton text={'Регистрация'} /></a>
                        </div>
                }

        </div>
    );
};

export default Menu;