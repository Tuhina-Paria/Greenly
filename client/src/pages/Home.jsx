import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import Top_Products from '../components/Top_Products'
import BottomBanner from '../components/BottomBanner'
import ExploreCategories from '../components/ExploreCategories'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <Top_Products/>
      <BottomBanner/>
      <ExploreCategories/>
      <NewsLetter/>
    </div>
  )
}

export default Home
