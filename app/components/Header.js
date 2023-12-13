"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from "@/public/logo.svg"
import { Bell, ChevronDown, MessageCircle, Search } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import UserSettingModal from './UserSettingModal'

const Header = () => {

    const [ActiveIndex, setActiveIndex] = useState(0)
    const [usermodal, setusermodal] = useState(false)

    const routesdata = [
        {
            name: "Home",
            path: "/"

        },
        {
            name: "Explore",
            path: "/explore"
        },
        {
            name: "Create",
            path: "/create"
        }
    ]

    const { data: session } = useSession()


    return (
        <div className='relative'>
            <header className="bg-white">
                <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-8">
                        <div className="flex md:flex md:items-center md:gap-8">
                            <div className='h-[60px] w-[60px] flex items-center justify-center'>
                                <a className="block text-teal-600" href="/">
                                    <Image src={logo} alt='logo' className='object-contain' />
                                </a>
                            </div>
                            <div className='flex items-center gap-4'>
                                {routesdata.map((item, index) => {
                                    return (
                                        <button className={ActiveIndex === index ? 'bg-black text-white py-3 px-6 text-sm capitalize font-semibold rounded-full' : " text-black py-3 px-6 text-sm capitalize font-semibold rounded-full"} key={index} onClick={() => setActiveIndex(index)}>{item.name}</button>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='flex items-center justify-start gap-4 bg-gray-200 p-3 rounded-full w-full'>
                            <Search className='cursor-pointer text-gray-500' />
                            <input type="search" placeholder='Search' className='w-full outline-none border-none bg-transparent placeholder:text-black' />
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            {!session ?
                                (<div className="flex items-center gap-4">
                                    <div className="sm:flex sm:gap-4">
                                        <button
                                            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white shadow"
                                            onClick={() => signIn()}
                                        >
                                            Login
                                        </button>

                                        <div className="hidden sm:flex">
                                            <a
                                                className="rounded-full bg-white border border-black px-5 py-2.5 text-sm font-medium text-black"
                                                href="/"
                                            >
                                                Register
                                            </a>
                                        </div>
                                    </div>

                                    <div className="block md:hidden">
                                        <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>) : (
                                    <div className="hidden md:flex items-center gap-6">
                                        <div className='bg-white hover:bg-gray-200 rounded-full p-2 cursor-pointer'>
                                            <Bell className='' />
                                        </div>
                                        <div className='bg-white hover:bg-gray-200 rounded-full p-2 cursor-pointer'>
                                            <MessageCircle />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='h-[38px] w-[38px]'>
                                                <Image className='rounded-full object-contain cursor-pointer' src={session?.user?.image} height={120} width={120} alt='user-image' />
                                            </div>
                                            <div className='bg-white hover:bg-gray-200 rounded-full p-1 cursor-pointer'>
                                                <ChevronDown onClick={() => setusermodal(!usermodal)} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </header>
            {
                <div className='absolute right-2'>
                    {
                        usermodal ? <UserSettingModal /> : null
                    }
                </div>
            }
        </div>
    )
}

export default Header