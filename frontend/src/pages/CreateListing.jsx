import React from 'react'
import Navbar from '../components/Navbar'
import AdminNavLinks from '../components/AdminNavLinks'
import AdminForm from '../components/AdminForm'

const CreateListing = () => {
  return (
    <div className='pt-2.5'>
        <Navbar />
        <AdminNavLinks />

        <h1 className="text-center text-2xl font-bold my-10">
              Create Listing
        </h1>

        <AdminForm formState='create'/>
    </div>
  )
}

export default CreateListing