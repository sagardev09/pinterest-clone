"use client"
import React, { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { app } from "@/app/FilrebaseConfig"
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation'
import PinImage from '@/app/components/PinDetails/PinImage';
import PinInfo from '@/app/components/PinDetails/PinInfo';
import Image from 'next/image';
import Loading from "@/public/Ghost.gif"
import { Vortex } from 'react-loader-spinner';

function PinDetail({ params }) {
    const router = useRouter();
    const db = getFirestore(app);
    const [loading, setloading] = useState(true)
    const [pinDetail, setPinDetail] = useState([]);
    useEffect(() => {
        params && getPinDetail();
    }, [params])
    const getPinDetail = async () => {
        try {
            const docRef = doc(db, 'pinterest-post', params.pinId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPinDetail(docSnap.data())
            } else {

                console.log("No such document!");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setloading(false)
        }

    }
    return (
        <>
            {!pinDetail || loading ? (
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
                <div className=' bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
                    <HiArrowSmallLeft className='text-[60px] font-bold ml-[-50px] 
       cursor-pointer hover:bg-gray-200 rounded-full p-2 '
                        onClick={() => router.back()} />
                    <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 '
                    >
                        <PinImage pinDetail={pinDetail} />
                        <div className="">
                            <PinInfo pinDetail={pinDetail} />
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default PinDetail