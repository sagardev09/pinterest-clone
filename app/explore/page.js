import React from 'react'
import CategoryCard from './_components/CategoryCard';

const Explore = () => {

    const presentDate = Date.now();

    const dateObject = new Date(presentDate);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const year = dateObject.getFullYear();


    const formattedDate = `${day} ${month} ${year}`;


    return (
        <div>
            <div className='w-full my-4'>
                <h1 className="text-center text-xl font-normal">{formattedDate}</h1>
                <h1 className='text-center text-4xl font-semibold capitalize'>stay inspired</h1>
            </div>
            <div>
                <CategoryCard />
            </div>
        </div>
    )
}

export default Explore