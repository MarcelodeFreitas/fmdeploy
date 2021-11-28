import React from 'react'
import '../../App.css'
import Navbar from '../Navbar'

export default function Services() {
    return(
    <>
        <Navbar/>
        <h1 className="services" style={{backgroundImage: "url(/images/img-1.jpg)"}}>
            Documentation
        </h1>
    </>
    )
}