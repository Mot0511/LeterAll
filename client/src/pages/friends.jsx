import React, {useEffect, useMemo, useState} from 'react'
import cl from './friends.module.css'
import Person from "../components/person/person";
import {useParams} from "react-router";

import avatar from '../img/avatar.png'
import initApp from "../hooks/initApp";
import {doc, getDoc, getFirestore, getDocs, query, collection, where} from "firebase/firestore";

const Friends = () => {
    const app = initApp()
    const db = getFirestore(app)
    const login = useParams().login

    const [friends, setFriends] = useState([])
    const [surnames, setSurnames] = useState([])
    const [lastnames, setLastnames] = useState([])
    const [info, setInfo] = useState([])

    useMemo(() => {
        const getData = async () => {
            let friends = await getDoc(doc(db, 'users', login))
            friends = friends.data().friends
            let temp = []
            console.log(1);
            let data = await getDocs(query(collection(db, 'users'), where('login', 'in', friends)))
            data.forEach(doc => {
                temp.push(doc.data())
            })
            setInfo(temp)
        }
        getData()
    }, [])

    return (
        <div className={cl.friends}>
            <h2>Друзья</h2>
            <div className={cl.list}>
                {
                    info.map(el => <Person login={el.login} surname={el.surname} lastname={el.lastname} key={Math.random()} />)
                }
            </div>
        </div>
    )
}

export default Friends