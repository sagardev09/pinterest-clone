"use client"
import React, { useState, useEffect } from 'react'
import UploadImage from './UploadImage'
import { useSession } from "next-auth/react"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { app } from "@/app/FilrebaseConfig"
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import spinner from "@/public/spinner.gif"

function Form() {

    const { data: session } = useSession();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [link, setLink] = useState("");
    const [tag, settag] = useState("");
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [category, setcategory] = useState("")
    const router = useRouter();
    const storage = getStorage(app)
    const db = getFirestore(app);
    const postId = Date.now().toString();

    const onSave = () => {
        if (title.trim().length === 0 || !category) {
            alert("Please fill in the title and select a category.")
        } else {
            setLoading(true)
            uploadFile();
        }
    }
    useEffect(() => {
        console.log(category);
    }, [category])

    const uploadFile = () => {
        const storageRef = ref(storage, 'pinterest/' + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log("File Uploaded")
        }).then(resp => {
            getDownloadURL(storageRef).then(async (url) => {
                console.log("DownloadUrl", url);
                const postData = {
                    title: title,
                    desc: desc,
                    link: link,
                    image: url,
                    tag: tag,
                    type: file.type,
                    category: category,
                    userName: session.user.name,
                    email: session.user.email,
                    userImage: session.user.image,
                    id: postId
                }

                await setDoc(doc(db, 'pinterest-post', postId),
                    postData).then(resp => {
                        console.log("Saved")
                        setLoading(true);
                        router.push("/" + session.user.email)
                    })

            })
        })
    }

    return (
        <div className=' bg-white p-16 rounded-2xl '>
            <div className='flex justify-end mb-6'>
                <button onClick={() => onSave()}
                    className='bg-red-500 p-2
            text-white font-semibold px-3 
            rounded-lg'>
                    {loading ? <Image src={spinner}
                        width={30}
                        height={30}
                        alt='loading'
                        className='animate-spin mix-blend-multiply' /> :
                        <span>Save</span>}
                </button>
            </div>
            <div className='flex items-start gap-10'>
                <div className='flex-1 h-full w-full'>
                    <UploadImage setFile={(file) => setFile(file)} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Title <span className='text-red-500'>*</span></label>
                        <input disabled={!selectedFile} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Add a title" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}> Description</label>
                        <textarea type="text"
                            disabled={!selectedFile}
                            rows={6}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder='Tell everyone what your pin is about'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none' />
                    </div>
                    <div>
                        <label for="categories" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Category<span className='text-red-500'>*</span></label>
                        <select id="countries" value={category} className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setcategory(e.target.value)} placeholder="select a category">
                            <option value="default">Select a category</option>
                            <option value="design">Design Inspiration</option>
                            <option value="fashion">Fashion Trends</option>
                            <option value="art">Artistic Creations</option>
                            <option value="home">Home Decor Ideas</option>
                            <option value="photography">Photography</option>
                            <option value="food">Food and Recipes</option>
                            <option value="travel">Travel Destinations</option>
                            <option value="wedding">Wedding Planning</option>
                            <option value="fitness">Fitness Motivation</option>
                            <option value="quotes">Inspirational Quotes</option>
                            <option value="technology">Technology Innovations</option>
                            <option value="diy">DIY Projects</option>
                        </select>

                    </div>
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Link</label>
                        <input disabled={!selectedFile} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='Add a Destination Link' onChange={(e) => setLink(e.target.value)} />
                    </div>
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Tagged topics</label>
                        <input disabled={!selectedFile} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Search for a tag" onChange={(e) => settag(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form