"use client"
import React, { useState } from 'react'
import UploadImage from './UploadImage'
import { useSession } from 'next-auth/react'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '@/app/FilrebaseConfig';

const Form = () => {


    const { data: session } = useSession()
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [link, setlink] = useState("")
    const [topics, settopics] = useState("")
    const [file, setfile] = useState()
    const [selectedfile, setselectedfile] = useState()
    const storage = getStorage(app);
    const db = getFirestore(app);

    const postId = Date.now().toString()

    const onsave = () => {
        console.log(title, description, link, topics, file);
        uploadFile()
    }


    const uploadFile = () => {
        const storageRef = ref(storage, 'pinterest/' + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a  file!');
        }).then((res) => {
            getDownloadURL(storageRef).then(async (URL) => {
                console.log('File available at', URL);
                const formdata = {
                    title: title,
                    desc: description,
                    link: link,
                    topics: topics,
                    image: URL,
                    username: session?.user?.name,
                    useremail: session?.user?.email,
                    userimg: session?.user?.image
                }
                await setDoc(doc(db, "pinterest-post", postId), {
                    formdata
                }).then((res) => {
                    console.log("saved");
                })
            });
        })
    }

    return (
        <div className='bg-white p-16 rounded-2xl'>
            <div className='flex items-center justify-end mb-6'>
                <button className='bg-red-500 text-white font-semibold px-3 p-2 rounded-lg' onClick={() => onsave()}>Save</button>
            </div>
            <div className='flex gap-8'>
                <div className='flex-1'>
                    <UploadImage setfile={setfile} setselectedfile={setselectedfile} selectedfile={selectedfile} />
                </div>
                <div className='flex-1 flex flex-col gap-3'>
                    <div className='flex flex-col gap-1'>
                        <h5 className='capitalize text-gray-600 text-sm'>title</h5>
                        <input disabled={!selectedfile} type="text" name="" id="" className='w-full border-none outline-red-500 p-3 px-4 rounded-2xl bg-gray-100 text-base' placeholder='Add a title' onChange={(e) => settitle(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h5 className='capitalize text-gray-600 text-sm'>description</h5>
                        <textarea disabled={!selectedfile} name="" id="" cols="30" rows="5" className='w-full border-none outline-red-500 p-3 px-4 rounded-2xl bg-gray-100 text-base resize-none' placeholder='Add a description' onChange={(e) => setdescription(e.target.value)}></textarea>

                    </div>
                    <div className='flex flex-col gap-1'>
                        <h5 className='capitalize text-gray-600 text-sm'>Link</h5>
                        <input disabled={!selectedfile} type="text" name="" id="" className='w-full border-none outline-red-500 p-3 px-4 rounded-2xl bg-gray-100 text-base' placeholder='Add a link' onChange={(e) => setlink(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="HeadlineAct" className="capitalize text-gray-600 text-sm"> Category </label>

                        <select disabled={!selectedfile}
                            name="HeadlineAct"
                            id="HeadlineAct"
                            className="mt-1.5 w-full rounded-2xl  text-gray-600 sm:text-sm bg-gray-100 p-3 px-4"
                        >
                            <option value="">Please select</option>
                            <option value="JM">John Mayer</option>
                            <option value="SRV">Stevie Ray Vaughn</option>
                            <option value="JH">Jimi Hendrix</option>
                            <option value="BBK">B.B King</option>
                            <option value="AK">Albert King</option>
                            <option value="BG">Buddy Guy</option>
                            <option value="EC">Eric Clapton</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h5 className='capitalize text-gray-600 text-sm'>tagged topics</h5>
                        <input disabled={!selectedfile} type="text" name="" id="" className='w-full border-none outline-red-500 p-3 px-4 rounded-2xl bg-gray-100 text-base' placeholder='search for a tag' onChange={(e) => settopics(e.target.value)} />
                        <h5 className=' text-gray-400 text-xs'>Dont worry people cant see your tags topics</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form