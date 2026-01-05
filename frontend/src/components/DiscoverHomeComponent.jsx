import React from 'react'
import bannerImage from "../assets/bnb.jpg";

const DiscoverHomeComponent = () => {
  return (
    <div className="px-10 pt-8">
        <h1 className="font-bold text-2xl pb-9">Discover Airbnb Experiences</h1>
        <div className='flex items-center justify-center gap-4'>
            <div className='relative'>
                <img className='w-full h-[92vh] object-cover rounded-lg' src={bannerImage} alt="" />
                <div className='absolute top-15 left-15 text-white'>
                    <p className='font-bold text-3xl mb-5'>Things to do <br/> on your trip</p>
                    <button className='bg-gray-300 text-sm text-black px-3 pt-1 pb-1.5 rounded-md mt-3 hover:bg-pink-600 transition-colors duration-300 ease-in-out hover:cursor-pointer'>Experiences</button>
                </div>
            </div>
            <div className='relative'>
                <img className='w-full h-[92vh] object-cover rounded-lg' src={bannerImage} alt="" />
                <div className='absolute top-15 left-15 text-white'>
                    <p className='font-bold text-3xl mb-5'>Things to do <br/> from home</p>
                    <button className='bg-gray-300 text-sm text-black px-3 pt-1 pb-1.5 rounded-md mt-3 hover:bg-pink-600 transition-colors duration-300 ease-in-out hover:cursor-pointer'>Online Experiences</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DiscoverHomeComponent