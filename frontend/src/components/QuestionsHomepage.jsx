import React from 'react'
import bannerImage from "../assets/bnb.jpg";

const QuestionsHomepage = () => {
  return (
    <div className='mx-11 -mt-8 pb-10'>
        <div className='relative'>
            <img src={bannerImage} alt="" className='w-screen object-cover rounded-lg h-[68vh]'/>
            <div className='absolute top-16 left-15'>
                <p className='font-bold text-5xl mb-16 text-white'>Questions <br/> about <br/> hosting?</p>
            <button className='px-4 rounded-md pt-1 pb-1.5 bg-gray-300 text-black text-sm hover:bg-pink-600 transition-colors duration-300 ease-in-out hover:cursor-pointer'>Ask a super host</button>
            </div>
        </div>
    </div>
  )
}

export default QuestionsHomepage