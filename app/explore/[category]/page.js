"use client"
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/app/FilrebaseConfig"
import SingleCard from './_components/SingleCard';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EmptyCategoty from '../_components/EmptyCategoty';
import { Vortex } from 'react-loader-spinner';

const CategoryPage = ({ params }) => {
    const router = useRouter()

    const [categorydata, setcategorydata] = useState([])
    const [loading, setLoading] = useState(true);


    const db = getFirestore(app);

    const getdata = async () => {
        const q = query(collection(db, "pinterest-post"), where("category", "==", params.category));

        const NewArray = []
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                NewArray.push(doc.data())
                console.log(doc.id, " => ", doc.data());
            });
            setcategorydata(NewArray)
        } catch (error) {
            console.error("Error getting category data:", error);
        } finally {
            setLoading(false);
        }


    }

    useEffect(() => {
        if (params) {
            getdata()
        }
    }, [params])

    return (
        <div className="px-4">
            <div className="flex items-center gap-4">
                <div
                    className="p-4 hover:bg-gray-200 rounded-full cursor-pointer flex items-center justify-center"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="h-[30px] w-[30px]" />
                </div>
                <h1 className="capitalize font-medium text-3xl">{params.category}</h1>
            </div>
            <div className="">
                {loading ? (
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
                ) : categorydata.length === 0 ? (
                    <div className='w-[100vw] h-full flex items-center justify-center'>
                        <EmptyCategoty />
                    </div>

                ) : (
                    <div className='mt-7 px-2 md:px-5
        columns-2 md:columns-3
        lg:columns-4 mb-4
        xl:columns-5 space-y-6 mx-auto'>
                        {categorydata.map((item, index) => (
                            <div key={index}>
                                <SingleCard item={item} />
                            </div>
                        ))}
                    </div>

                )}
            </div>
        </div>
    )
}

export default CategoryPage