"use client"
import React, { useEffect } from 'react'
import { useSavedPins } from '../utils/SavedPinsContext'
import Image from 'next/image'



const SavedPost = () => {
    const { savedPins } = useSavedPins()
    useEffect(() => {
        console.log(savedPins);
    }, [])


    return (
        <div>
            <h1 className='text-center font-semibold text-2xl uppercase bg-red-500 px-4 p-2 text-white'>
                Saved Post
            </h1>
            {
                savedPins.map((item, index) => {
                    return (
                        <div key={index} className='mt-7 px-2 md:px-5
        columns-2 md:columns-3
        lg:columns-4 mb-4
        xl:columns-5 space-y-6 mx-auto'>
                            <Image src={item.image} alt='' height={500} width={500} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SavedPost