import Image from 'next/image'
import React from 'react'
import logo from "@/public/logo.svg"

const UserInfo = ({ Userdata, userid }) => {
    return (
        <div className='my-8 flex flex-col gap-2 items-center justify-center'>
            <div>
                <Image className='rounded-full' src={Userdata?.userimage} alt={Userdata?.username} height={150} width={150} />
            </div>
            <div className='flex flex-col gap-1 mt-3'>
                <div>
                    <h5 className='text-center font-semibold text-3xl'>{Userdata?.username}</h5>
                </div>
                <div className='flex items-center justify-center'>
                    <Image src={logo} alt='logo' className='h-[15px] object-contain' />
                    <h5 className='text-left text-gray-400 text-sm'>{(userid).split("@")[0]}</h5>
                </div>
            </div>
            <div className='flex items-center gap-4 mt-3'>
                <button className='py-3 px-6 bg-gray-300 text-black capitalize rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200'>share</button>
                <button className='py-3 px-6 bg-gray-300 text-black capitalize rounded-full text-sm font-medium cursor-pointer  hover:bg-gray-200'>edit profile</button>
            </div>
        </div>
    )
}

export default UserInfo