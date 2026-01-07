import React, { useContext } from 'react'


import Navbar from '../components/Navbar';
import HomepageInput from '../components/homepageComponents/HomepageInput';
import Banner from '../components/homepageComponents/Banner';
import InspirationHomeComponent from '../components/homepageComponents/InspirationHomeComponent';
import DiscoverHomeComponent from '../components/homepageComponents/DiscoverHomeComponent';
import BnbGiftCards from '../components/homepageComponents/BnbGiftCards';
import QuestionsHomepage from '../components/homepageComponents/QuestionsHomepage';

import Footer from '../components/Footer';
import Inspirations from '../components/homepageComponents/Inspirations';

const Homepage = () => {
  return (
    <div>
      <div className='bg-black'>
        <Navbar/>
        <HomepageInput/>
        <Banner />
      </div>
      <div>
       <InspirationHomeComponent/>
        <DiscoverHomeComponent />
        <BnbGiftCards />
        <QuestionsHomepage />
        <Inspirations />
        <Footer />
      </div>
        

    </div>
  )
}

export default Homepage