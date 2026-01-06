import React from 'react'
import giftCards from '../../assets/Airbnb-giftCards.jpg'

const BnbGiftCards = () => {
  return (
    <div className='px-10 flex flex-row items-center justify-between'>
        <div className='ml-15'>
            <p className='font-bold text-xl mb-3'>Shop Airbnb <br/> gift cards</p>
            <button className='px-3 rounded-md pt-1 pb-1.5 bg-black text-white text-sm hover:bg-pink-600 transition-colors duration-300 ease-in-out hover:cursor-pointer'>Learn more</button>
        </div>
        <div>
            <img src={giftCards} alt="" className='w-130 h-80 object-contain mr-55' />
        </div>
    </div>
  )
}

export default BnbGiftCards