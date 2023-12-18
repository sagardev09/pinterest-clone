"use client"
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const SingleCard = ({ item }) => {

    const router = useRouter()

    return (
        <div className='relative group/item'>
            <div class="relative 
   before:absolute
   before:h-full before:w-full
   before:rounded-3xl
   before:z-10
   hover:before:bg-gray-600 
   before:opacity-20
   cursor-zoom-in
   " onClick={() => router.push("/pin/" + item.id)}>

                <Image src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className='rounded-3xl 
    cursor-pointer relative z-0'
                />
            </div>
            <div className='absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 px-3 z-[1000] cursor-pointer flex items-center gap-1 invisible group-hover/item:visible hover:bg-red-600 '>
                <h5 className='text-[10px]'>Profile</h5>
                <ChevronDown className='h-[12px] w-[12px]' />
            </div>
            <div className='absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 px-3 z-[1000] cursor-pointer flex items-center gap-1 invisible group-hover/item:visible hover:bg-red-600 '>
                <h5 className='text-[10px]'>Save</h5>
            </div>
            {item.link && <div className='absolute bottom-4 left-4 bg-gray-500 text-white rounded-full p-2 px-3 z-[1000] cursor-pointer flex items-center gap-1 invisible group-hover/item:visible hover:bg-gray-600 '>
                <h5 className='text-[10px]'>{item.link}</h5>
            </div>}
        </div>
    )
}

export default SingleCard