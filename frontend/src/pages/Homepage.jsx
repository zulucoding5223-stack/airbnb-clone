import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import HomepageInput from '../components/HomepageInput'
import Banner from '../components/Banner'
import InspirationHomeComponent from '../components/InspirationHomeComponent'
import DiscoverHomeComponent from '../components/DiscoverHomeComponent'
import BnbGiftCards from '../components/BnbGiftCards'
import QuestionsHomepage from '../components/QuestionsHomepage'
import Inspirations from '../components/Inspirations'
import Footer from '../components/Footer'
import { AppContext } from '../utils/AppContextProvider'

const Homepage = () => {
  const {user} = useContext(AppContext);
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