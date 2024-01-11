import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Slide } from "react-awesome-reveal";
import { Context } from '../App';

const HomePage = () => {

  const {currentUser} = useContext(Context)

  return (
    <section className="">

    {/* Illustration behind hero content */}
    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
      <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
            <stop stopColor="#FFF" offset="0%" />
            <stop stopColor="#EAEAEA" offset="77.402%" />
            <stop stopColor="#DFDFDF" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="url(#illustration-01)" fillRule="evenodd">
          <circle cx="1232" cy="128" r="128" />
          <circle cx="155" cy="443" r="64" />
        </g>
      </svg>
    </div>
    
    <div className="w-full mx-auto px-4 sm:px-6">
    
      {/* Hero content */}
      <div className="pt-40 pb-20">
        
        {/* Section header */}
        <div className="w-full h-full text-center pb-12">
        <Slide cascade>
          <h1 className="text-7xl font-extrabold leading-tighter tracking-tighter mb-8" data-aos="zoom-y-out">Potrebujete drugo <p className="h-[100px] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">mnenje?</p></h1>
          <div className="mx-auto">
            <p className="text-2xl text-gray-600 mb-10" data-aos="zoom-y-out" data-aos-delay="150">Forum, ki temelji na glasovanju.</p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
              {currentUser ?
              <div>
                <Link to="/questions" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Začni</Link>
              </div>
              :
              <>
              <div>
                <Link to="/login" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Prijava</Link>
              </div>
              <div>
                <Link to="/signup" className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Registracija</Link>
              </div>
              </>
              }
            </div>
          </div>
        </Slide>
        </div>
        

      </div>
      
    </div>
    
  </section>
  )
}

export default HomePage