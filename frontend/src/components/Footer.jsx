import React, { useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {
    const [language, setLanguage] = useState('English');
    const [currency, setCurrency] = useState('USD');
  return (
    <div className="bg-gray-50 pt-10 px-10 text-xs text-gray-400">
      <div className="flex flex-row pb-10">
        <ul className="hover:cursor-pointer">
          <li className="font-bold text-black">Support</li>
          <li>Help Center</li>
          <li>Safety information</li>
          <li>Cancellation options</li>
          <li>Our COVID-19 Response</li>
          <li>Supporting people with disabilities</li>
          <li>Report neighborhood concern</li>
        </ul>
        <ul className="ml-22 hover:cursor-pointer">
          <li className="font-bold text-black">Community</li>
          <li>Airbnb.org: disaster relief housing</li>
          <li>Support Afghan refugees</li>
          <li>Combating discrimination</li>
          <li>Join the LGBTQ+ community</li>
          <li>Guest Referrals</li>
          <li>Gift cards</li>
        </ul>
        <ul className="ml-29 hover:cursor-pointer">
          <li className="font-bold text-black">Hosting</li>
          <li>Try hosting</li>
          <li>AirCover: protection for Hosts</li>
          <li>Explore hosting resources</li>
          <li>Visit our community forum</li>
          <li>How to host responsibly</li>
          <li>Host an online experience</li>
        </ul>
        <ul className="ml-35 hover:cursor-pointer">
          <li className="font-bold text-black">About</li>
          <li>Newsroom</li>
          <li>Learn about new features</li>
          <li>Letter from our founders</li>
          <li>Careers</li>
          <li>Investors</li>
          <li>Airbnb luxe</li>
        </ul>
      </div>
      <hr className='text-gray-200' />
      <div className="pt-2 pb-2 flex items-center justify-between hover:cursor-pointer">
        <p>©2024 Airbnb Clone-Privacy-Terms-Sitemap</p>
        <p className="flex items-center gap-2">
            <LanguageIcon className="text-black"/>
            <select onChange={(e) => setLanguage(e.target.value)} value={language} className="w-fit text-black border rounded">
                <option value='English'>English</option>
                <option value='Chinese'>Chinese</option>
                <option value='French'>French</option>
            </select>
            <select onChange={(e) => setCurrency(e.target.value)} value={currency} className="w-fit text-black border rounded">
                <option value='USD'>USD</option>
                <option value='Euro'>Euro</option>
                <option value='ZAR'>ZAR</option>
            </select>
            <FacebookIcon className="text-white bg-black"/>
            <TwitterIcon className="text-black" />
            <InstagramIcon className="text-black"/>
        </p>
      </div>
    </div>
  );
};

export default Footer;
