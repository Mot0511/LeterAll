import React, {useEffect, useState} from 'react';
import './profile.css'
import Mybutton from "../components/mybutton/mybutton";
import {useParams} from "react-router";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import initApp from "../hooks/initApp";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const app = initApp()
    const login = useParams().login
    const [surname, setSurname] = useState('')
    const [lastname, setLastname] = useState('')
    const [countFriends, setCountFriends] = useState(0)
    const [cookie] = useCookies()
    const nav = useNavigate()

    useEffect(() => {
        console.log(cookie);
        const getData = async () => {
            const db = getFirestore(app)
            const data = await getDoc(doc(db, 'users', login))
            setSurname(data.data().surname)
            setLastname(data.data().lastname)
            setCountFriends(data.data().countFriends)
        }
        // if (!cookie.login) {
        //     nav('/login')
        // }
        getData()
    }, [])

    return (
        <div className={''}>
            <div className={'profile'}>
                <div className={'avatar'}>

                </div>
                <div className={'info'}>
                    <p>@{login}</p>
                    <h2>{surname} {lastname}</h2>
                    <Mybutton text={'Добавить в друзья'} />
                    <Mybutton text={'Написать соообщение'} />
                    <div className={'people'}>
                        <div className={'friends'}>
                            <p>{countFriends}</p>
                            <p>Друзей</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className={'photos'}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Profile;