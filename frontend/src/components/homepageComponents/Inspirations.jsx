import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Inspirations = () => {
    const destinations = [
        "Destinations for arts and culture",
        "Destinations for outdoor adventure",
        "Mountain cabins",
        "Beach destinations",
        "Popular destinations",
        "Unique stays"
    ]

    const [isHovered, setIsHovered] = useState(-1);
  return (
    <div className='px-10 pb-20'>
        <h1 className='font-bold pb-7'>Inspiration for future gateways</h1>
        <ul className='text-xs flex items-center gap-5'>
            {
                destinations.map((destination, index) => {
                    return (
                            <li key={index} onMouseOver={() => setIsHovered(index)} onMouseOut={() => setIsHovered(-1)} className='hover:cursor-pointer'>
                                <span>{destination}</span>
                                <hr className={`mt-1 ${isHovered === index ? 'opacity-100' : 'opacity-0'} text-pink-500 transition-opacity duration-300`}/>
                            </li>
                    )
                })
            }
        </ul>
        <hr className='text-gray-200' />

        <div className='pt-10 flex items-center text-xs gap-50'>
            <div className='flex flex-col gap-4 hover:cursor-pointer'>
                <div>
                    <p className='font-bold'>Eiffel Tower</p>
                    <p>Paris, France</p>
                </div>
                <div>
                    <p className='font-bold'>Colosseum</p>
                    <p>Rome, Italy</p>
                </div>
                <div>
                    <p className='font-bold'>Great Wall</p>
                    <p>Beijing, China</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 hover:cursor-pointer'>
                <div>
                    <p className='font-bold'>Statue of Liberty</p>
                    <p>New York, USA</p>
                </div>
                <div>
                    <p className='font-bold'>Colosseum</p>
                    <p>Rome, Italy</p>
                </div>
                <div>
                    <p className='font-bold'>Great Wall</p>
                    <p>Beijing, China</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 hover:cursor-pointer'>
                <div>
                    <p className='font-bold'>Shibuya Crossing</p>
                    <p>Tokyo, Japan</p>
                </div>
                <div>
                    <p className='font-bold'>Colosseum</p>
                    <p>Rome, Italy</p>
                </div>
                <div>
                    <p className='font-bold'>Great Wall</p>
                    <p>Beijing, China</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 hover:cursor-pointer'>
                <div>
                    <p className='font-bold'>Big Ben</p>
                    <p>London, UK</p>
                </div>
                <div>
                    <p className='font-bold'>Colosseum</p>
                    <p>Rome, Italy</p>
                </div>
                <div>
                    <p className='font-bold'>Great Wall</p>
                    <p>Beijing, China</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inspirations