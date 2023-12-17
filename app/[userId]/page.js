"use client"
import React, { useEffect, useState } from 'react'
import { app } from "@/app/FilrebaseConfig"
import { collection, getDocs, getDoc, doc, getFirestore, query, where } from 'firebase/firestore'
import PinList from '../components/Pins/PinList';
import UserInfo from './_components/UserInfo';

function Profile({ params }) {

    const db = getFirestore(app);
    const [userInfo, setUserInfo] = useState();
    const [listOfPins, setListOfPins] = useState([]);

    useEffect(() => {
        console.log(params.userId.replace('%40', '@'))
        if (params) {
            getUserInfo(params.userId.replace('%40', '@'))
        }
    }, [params]);


    const getUserInfo = async (email) => {
        const docRef = doc(db, "user", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            setUserInfo(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    useEffect(() => {
        if (userInfo) {
            getUserPins();
        }
    }, [userInfo])
    const getUserPins = async () => {
        setListOfPins([])
        const q = query(collection(db, 'pinterest-post')
            , where("email", '==', userInfo.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setListOfPins(listOfPins => [...listOfPins, doc.data()]);
            console.log(listOfPins);
        });
    }
    return (
        <div>
            {userInfo ?
                <div>
                    <UserInfo userInfo={userInfo} />

                    <PinList listOfPins={listOfPins} />
                </div> : null}
        </div>
    )
}

export default Profile