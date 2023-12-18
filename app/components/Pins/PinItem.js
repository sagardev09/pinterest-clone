"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function PinItem({ pin }) {

    useEffect(() => {
        console.log(pin.type);
    }, [])

    const router = useRouter();
    const isVideo = pin.type === 'video/mp4';
    return (
        <div className='relative'>
            <div class="relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       cursor-pointer
       " onClick={() => router.push("/pin/" + pin.id)}>

                {isVideo ? (
                    <video
                        src={pin.image}
                        width={500}
                        height={500}
                        className="rounded-3xl cursor-pointer relative z-0"
                        autoPlay
                        muted
                    ></video>
                ) : (
                    <Image
                        src={pin.image}
                        alt={pin.title}
                        width={500}
                        height={500}
                        className="rounded-3xl cursor-pointer relative z-0"
                    />
                )}

            </div>
            <h2 className='font-bold 
        text-[18px] mb-1 mt-2 line-clamp-2 absolute top-4 left-4 text-white capitalize'>{pin.title}</h2>

        </div>
    )
}

export default PinItem