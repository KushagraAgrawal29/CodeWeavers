import React from 'react'
import ContactDetails from '../components/core/ContactPage/ContactDetails'
import ContactForm from '../components/core/ContactPage/ContactForm'
import Footer from '../components/Common/Footer'

const Contact = () => {
  return (
    <div className='bg-richblack-900 text-white'>
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between mt-20'>
            <div className='flex flex-col md:flex-row gap-10'>
                <div className='lg:w-[40%]' >
                    <ContactDetails/>
                </div>

                <div className='lg:w-[60%] flex flex-col gap-3 border border-richblack-600 rounded-xl p-7 lg:p-14'>
                    <h1 className='text-4xl font-semibold text-richblack-5'>Got a Idea? We've got the skills. Let's team up</h1>
                    <p className='mb-8 text-richblack-300'>Tell us more about yourself and what you&apos;re got in mind.</p>

                    <ContactForm/>
                </div>
            </div>

            {/* Review Section  */}
            <div className='mt-8'>
                <h2 className='text-3xl text-center md:text-4xl font-semibold mt-8'>Review From Other Learners</h2>
            </div>
        </div>

        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Contact
