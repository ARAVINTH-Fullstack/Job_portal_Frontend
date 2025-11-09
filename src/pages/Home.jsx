import React from 'react'
import {useNavigate} from "react-router-dom"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from './Hero'

function Home() {
    const navigate = useNavigate()
    console.log(localStorage.getItem("candidate_access_token"))
  return (
    <>
      <Navbar/>
      <Hero />
      <Footer/>
    </>
  )
}

export default Home