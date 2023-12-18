"use client"
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/app/FilrebaseConfig"
import SingleCard from './_components/SingleCard';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CategoryPage = ({ params }) => {
    const router = useRouter()

    const [categorydata, setcategorydata] = useState([])


    const db = getFirestore(app);

    const getdata = async () => {
        const q = query(collection(db, "pinterest-post"), where("category", "==", params.category));

        const NewArray = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            NewArray.push(doc.data())
            console.log(doc.id, " => ", doc.data());
        });
        setcategorydata(NewArray)
    }

    useEffect(() => {
        if (params) {
            getdata()
        }
    }, [params])

    return (
        <div className='px-4'>
            <div className='flex items-center gap-4'>
                <div className='p-4 hover:bg-gray-200 rounded-full cursor-pointer flex items-center justify-center' onClick={() => router.back()}>
                    <ChevronLeft className='h-[30px] w-[30px]' />
                </div>
                <h1 className='capitalize font-medium text-3xl'>{params.category}</h1>
            </div>
            <div className='mt-7 px-2 md:px-5
        columns-2 md:columns-3
        lg:columns-4 mb-4
        xl:columns-5 space-y-6 mx-auto'>
                {categorydata.map((item, index) => {
                    return (
                        <div key={index}>
                            <SingleCard item={item} />
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default CategoryPage