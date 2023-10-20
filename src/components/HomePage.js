import React from 'react'
import home_image from '../assets/home_image_2.jpg'
import './HomePage.css'

export const HomePage = () => {
  return (
    <div className='home container'>
        <div className='container'>
          <img src={home_image} alt='home_page_image' className='home_image'></img>
        </div>
        <div className='home_about container'>
            This application is a clone of online judge LeetCode where one can submit their code which will be run against multiple test cases in a secured way and the results will be published.
            Users can create their accounts and start solving DSA problems. Users can keep a track of all the problems they have solved.
        </div>
    </div>
  )
}
