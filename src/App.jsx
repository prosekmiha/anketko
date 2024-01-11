import { useState, useContext, createContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import NewSurvey from './pages/NewSurvey'
import Surveys from './pages/Surveys'
import SurveyPage from './pages/SurveyPage'

import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/firebase"

export const Context = createContext();

function App() {

  const [user, setUser] = useState(sessionStorage.getItem("user"))

  const [currentUser, setCurrentUser] = useState(user);
  const [surveyData, setSurveyData] = useState([]);

  const fetchData = async () => {
    let list = [];
    const querySnapshot = await getDocs(collection(db, "surveys"));
    querySnapshot.forEach((doc) => {
      list.push({...doc.data()})
    });
    setSurveyData(list);
  }

  useEffect(() => {
    user == null && setUser("");
    fetchData();
  }, [])

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  return (
    <Context.Provider value={{ currentUser, setCurrentUser, surveyData, setSurveyData }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/' element={<HomePage/>} />
          <Route path='login' element={<Login/>} />
          <Route path='signup' element={<Register/>} />
          <Route path='questions' element={<Surveys />} />
          <Route path='questions/:surveyId' element={<SurveyPage />} />
          <Route path='new-question' element={<RequireAuth><NewSurvey/></RequireAuth>} />
        </Route>
      </Routes>
    </Context.Provider>
  )
}

export default App
