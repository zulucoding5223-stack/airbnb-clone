import React from 'react'
import bannerImage from '../../assets/unsplash-image-so3wgJLwDxo.webp'

const Banner = () => {
  return (
    <div className='w-fit mx-auto text-white pt-4 pb-14 px-10 relative'>
        <img src={bannerImage} alt="" className='w-screen h-[79vh] object-cover'/>
        <div className='absolute bottom-18 left-4/11'>
          <p className='text-2xl mb-2'>Not sure where to go? Perfect</p>
          <button className='text-sm ml-28 bg-white text-black px-3 rounded-2xl pt-0.5 pb-1 hover:bg-pink-600 hover:text-white transition-colors duration-300 ease-in-out hover:cursor-pointer'>I'm flexible</button>
        </div>
    </div>
  )
}

export default Banner