"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/app/FilrebaseConfig"
import PinsInfo from './AllPins/PinsInfo';

const AllPins = () => {

    const [allpins, setallpins] = useState([])

    const db = getFirestore(app);



    const getallpins = async () => {
        const pinsArray = [];
        const querySnapshot = await getDocs(collection(db, "pinterest-post"));
        querySnapshot.forEach((doc) => {
            pinsArray.push(doc.data());
        });
        setallpins(pinsArray);
    }

    useEffect(() => {
        getallpins()
    }, [])



    return (
        <div className='mt-7 px-2 md:px-5
        columns-2 md:columns-3
        lg:columns-4 mb-4
        xl:columns-5 space-y-6 mx-auto'>
            {
                allpins.map((item, index) => {
                    return (
                        <PinsInfo key={index} pin={item} />
                    )
                })
            }
        </div>
    )
}

export default AllPins