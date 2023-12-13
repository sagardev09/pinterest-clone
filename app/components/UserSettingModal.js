import { Check, ExternalLink } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const UserSettingModal = () => {

    const { data: session } = useSession()


    return (
        <div className='bg-gray-100 shadow-lg  h-[600px]  rounded-md p-2'>
            <h5 className='text-black text-xs font-light px-2 py-1'>Currently in</h5>
            <div className='flex items-center justify-between gap-3 my-2 hover:bg-gray-300 cursor-pointer rounded-md p-2'>
                <div>
                    <Image className='rounded-full object-contain' src={session?.user?.image} alt='user-image' height={60} width={60} />
                </div>
                <div>
                    <h4 className='text-[16px] font-semibold capitalize'>{(session?.user?.name).toLowerCase()}</h4>
                    <h5 className='text-[14px] text-gray-500'>Personal</h5>
                    <h5 className='text-[14px] text-gray-500'>{session?.user?.email}</h5>
                </div>
                <div>
                    <Check />
                </div>
            </div>
            <h5 className='text-black text-xs font-light px-2 py-1'>Your accounts</h5>
            <div className='flex flex-col gap-[2px]'>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer'>
                    <h5 className='text-sm font-semibold capitalize'>Add account</h5>
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer'>
                    <h5 className='text-sm font-semibold capitalize'>Convert to business</h5>
                </div>
            </div>
            <h5 className='text-black text-xs font-light px-2 py-1'>More options</h5>
            <div className='flex flex-col gap-[2px]'>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer'>
                    <h5 className='text-sm font-semibold capitalize'>setting</h5>
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer'>
                    <h5 className='text-sm font-semibold capitalize'>turn your home feed</h5>
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer'>
                    <h5 className='text-sm font-semibold capitalize'>install the chrome app</h5>
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer'>
                    <h5 className='text-sm font-semibold capitalize'>your privacy right</h5>
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer flex items-center justify-between'>
                    <h5 className='text-sm font-semibold capitalize'>get help</h5>
                    <ExternalLink className='h-[20px]' />
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer flex items-center justify-between'>
                    <h5 className='text-sm font-semibold capitalize'>see terms and services</h5>
                    <ExternalLink className='h-[20px]' />
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer flex items-center justify-between'>
                    <h5 className='text-sm font-semibold capitalize'>see privacy policy</h5>
                    <ExternalLink className='h-[20px]' />
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer flex items-center justify-between'>
                    <h5 className='text-sm font-semibold capitalize'>be a beta tester</h5>
                    <ExternalLink className='h-[20px]' />
                </div>
                <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer' onClick={() => signOut()}>
                    <h5 className='text-sm font-semibold capitalize'>log out</h5>
                </div>
            </div>
        </div>
    )
}

export default UserSettingModal