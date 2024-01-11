import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../App'
import { Fade } from "react-awesome-reveal";

const Header = () => {

  const {currentUser, setCurrentUser} = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    setCurrentUser("")
    navigate("/")
  }

  return (
    <Fade>
    <header>
      <nav className="pb-5 pt-5 flex md:flex-row gap-6 flex-col w-full items-center align-center justify-between px-8" aria-label="Global">
        
        <div className="flex flex-1">
          <Link to="/" className="-m-3 p-1.5">
            <p className='text-2xl font-bold text-blue-600'>ANKETKO</p>
          </Link>

        </div>
        <div className="flex gap-x-12">
          <Link to="/" className="text-md font-semibold leading-6 text-gray-900">Domov</Link>
          <Link to="/questions" className="text-md font-semibold leading-6 text-gray-900">Vprašanja</Link>
          <Link to="/new-question" className="text-md font-semibold leading-6 text-gray-900">Objavi vprašanje</Link>
        </div>
        <div className="flex flex-1 justify-end">
          { currentUser ? 
            <>
              <p className="text-md font-semibold leading-6 text-gray-900 mr-5">{currentUser}</p>
              <p onClick={handleLogout} className="text-md font-semibold leading-6 text-gray-900 mr-5 cursor-pointer">Odjava</p>   
            </>   
          :
            <>
              <Link to="/login" className="text-md font-semibold leading-6 text-gray-900 mr-5">Prijava</Link>
              <Link to="/signup" className="text-md font-semibold leading-6 text-gray-900">Registracija</Link>
            </>
          }
        </div>

      </nav>
    </header>
    </Fade>
  )
}

export default Header