import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import SurveyPageItem from '../components/SurveyPageItem';
import SurveyChart from '../components/SurveyChart';
import Comments from '../components/Comments';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import SurveyPageDock from '../components/SurveyPageDock';


const SurveyPage = () => {

    const surveyState = useLocation()
    const { survey } = surveyState.state
  
    const [data, setData] = useState();


    const fetchData = async () => {
      let list = [];
      const querySnapshot = await getDocs(collection(db, "surveys"));
      querySnapshot.forEach((doc) => {
        if(doc.data().id == survey.id) {
          list.push(doc.data())
          setData(list[0]);
        }
      });
      
    }


    useEffect(() => {
      fetchData()  

    }, [])



console.log(data)
  return (
    <div className='w-full min-h-[95vh] flex flex-row justify-center bg-[#e6e6e6]'>
      <div className='max-w-[1000px]'>
        {data &&
        <>
        <div className='w-full h-fit flex justify-between items-center flex-col'>
          <SurveyPageDock survey={data} />
        </div>
        <div className='w-full h-fit flex justify-between items-center flex-col lg:flex-row'>
          <SurveyPageItem survey={data} />
          <SurveyChart survey={data} />
          
        </div>
        <div>
          <Comments survey={data} />
        </div>
        </>
        }
      </div>
    </div>
  )
}

export default SurveyPage