"use client"
import Image from 'next/image';
import React from 'react'
import design from "@/public/design.avif"
import art from "@/public/art.avif"
import diy from "@/public/diy.avif"
import fashion from "@/public/fashion.avif"
import fitness from "@/public/fitness.avif"
import food from "@/public/food.avif"
import home from "@/public/home.avif"
import photography from "@/public/photography.avif"
import quotes from "@/public/quotes.avif"
import technology from "@/public/technology.avif"
import travel from "@/public/travel.avif"
import wedding from "@/public/wedding.avif"
import { useRouter } from 'next/navigation';

const CategoryCard = () => {

    const router = useRouter()

    const handlecategory = (item) => {
        router.push(item.path)
    }

    const categoriesData = [
        {
            name: "design",
            image: design,
            desc: "Explore creative and innovative design inspirations.",
            path: "explore/design"
        },
        {
            name: "fashion",
            image: fashion,
            desc: "Stay in the loop with the latest fashion trends and styles.",
            path: "explore/fashion"
        },
        {
            name: "art",
            image: art,
            desc: "Discover a world of artistic creations and expressions.",
            path: "explore/art"
        },
        {
            name: "home",
            image: home,
            desc: "Get inspired by home decor ideas and interior designs.",
            path: "explore/home"
        },
        {
            name: "photography",
            image: photography,
            desc: "Capture the moment with stunning photography insights.",
            path: "explore/photography"
        },
        {
            name: "food",
            image: food,
            desc: "Delight your taste buds with mouthwatering recipes and food ideas.",
            path: "explore/food"
        },
        {
            name: "travel",
            image: travel,
            desc: "Embark on a journey to beautiful travel destinations around the world.",
            path: "explore/travel"
        },
        {
            name: "wedding",
            image: wedding,
            desc: "Plan your dream wedding with tips and inspiration.",
            path: "explore/wedding"
        },
        {
            name: "fitness",
            image: fitness,
            desc: "Find motivation and tips for a healthy and active lifestyle.",
            path: "explore/fitness"
        },
        {
            name: "quotes",
            image: quotes,
            desc: "Discover inspiration through thought-provoking quotes.",
            path: "explore/quotes"
        },
        {
            name: "technology",
            image: technology,
            desc: "Stay updated on the latest technology innovations and trends.",
            path: "explore/technology"
        },
        {
            name: "diy",
            image: diy,
            desc: "Unleash your creativity with exciting DIY projects.",
            path: "explore/diy"
        },
    ];


    return (
        <div className='p-20'>
            <div className='flex items-center flex-wrap justify-between'>
                {categoriesData.map((item, index) => {
                    return (
                        <div key={item.name} className=' h-[400px] w-[400px] mb-3 relative overflow-hidden cursor-pointer ' onClick={() => handlecategory(item)}>
                            <Image src={item.image} alt={item.name} className='object-cover h-[100%] w-[100%] rounded-3xl ' />
                            <div className='bg-[#19191944] bottom-0 absolute rounded-br-3xl rounded-bl-3xl w-full
                             h-[100px] flex flex-col gap-4 py-3 '>
                                <h5 className='text-center text-white uppercase font-extrabold text-xl'>{item.name}</h5>
                                <h5 className='text-center text-white uppercase font-medium text-xs'>{item.desc}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


export default CategoryCard;




