import React from 'react'
import empty from "@/public/empty.png"
import Image from 'next/image'

const EmptyCategoty = () => {
    return (
        <div className='flex flex-col gap-6 py-6'>
            <div>
                <Image src={empty} alt='empty' className='h-[500px] w-[500px] object-contain' />
            </div>
            <div className='mt-4'>
                <h1 className='text-center font-bold text-2xl uppercase'> this category does not conatin any files</h1>
            </div>
        </div>
    )
}

export default EmptyCategoty