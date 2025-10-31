import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import Top_Products from '../components/Top_Products'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <Top_Products/>
    </div>
  )
}

export default Home
