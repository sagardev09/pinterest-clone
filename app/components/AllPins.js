"use client"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/app/FilrebaseConfig";
import PinsInfo from './AllPins/PinsInfo';
import { Vortex } from 'react-loader-spinner';

const AllPins = () => {

    const [allpins, setallpins] = useState([])
    const [loading, setloading] = useState(true)

    const db = getFirestore(app);

    const getallpins = async () => {
        try {
            const pinsArray = [];
            const querySnapshot = await getDocs(collection(db, "pinterest-post"));
            querySnapshot.forEach((doc) => {
                pinsArray.push(doc.data());
            });
            setallpins(pinsArray);
        } catch (error) {
            console.log("something went wrong", error);
        } finally {
            setloading(false)
        }

    }

    useEffect(() => {
        getallpins()
    }, [])



    return (
        <div className=''>
            {
                loading ? (
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
                ) : (
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


        </div>
    )
}

export default AllPins