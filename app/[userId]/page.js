"use client"
import React, { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "@/app/FilrebaseConfig"
import UserInfo from './_components/UserInfo';

const ProfilePage = ({ params }) => {

    const [Userdata, setUserdata] = useState()
    const db = getFirestore(app);
    const userid = params.userId + "@gmail.com"

    const getuserdata = async (email) => {
        if (email) {
            const docRef = doc(db, "user", email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserdata(docSnap.data());
                console.log("Document data:", docSnap.data());

            } else {
                console.log("No such document!");
            }
        }
    }


    useEffect(() => {
        params.userId && getuserdata(userid)
        console.log(userid);
    }, [])



    return (
        <div>
            <div className='flex justify-center'>
                <UserInfo Userdata={Userdata} userid={userid} />
            </div>
        </div>
    )
}

export default ProfilePage