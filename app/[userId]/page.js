"use client"
import React, { useEffect, useState } from 'react'
import { app } from "@/app/FilrebaseConfig"
import { collection, getDocs, getDoc, doc, getFirestore, query, where } from 'firebase/firestore'
import PinList from '../components/Pins/PinList';
import UserInfo from './_components/UserInfo';
import Loading from "@/public/Ghost.gif"
import Image from 'next/image';
import { Vortex } from 'react-loader-spinner';

function Profile({ params }) {

    const db = getFirestore(app);
    const [userInfo, setUserInfo] = useState();
    const [listOfPins, setListOfPins] = useState([]);
    const [loading, setloading] = useState(true)

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
        try {
            setListOfPins([])
            const q = query(collection(db, 'pinterest-post')
                , where("email", '==', userInfo.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setListOfPins(listOfPins => [...listOfPins, doc.data()]);
                console.log(listOfPins);
            });
        } catch (error) {
            console.log("something occurred", error);
        } finally {
            setloading(false)
        }

    }
    return (
        <div>
            {!userInfo || loading ?
                <div className='flex flex-col gap-3 h-full w-[100vw] items-center justify-center'>
                    <Vortex
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                    <h5 className='text-lg font-semibold capitalize'>Loading...</h5>
                </div>
                : <div>
                    <UserInfo userInfo={userInfo} />

                    <PinList listOfPins={listOfPins} />
                </div>}
        </div>
    )
}

export default Profile