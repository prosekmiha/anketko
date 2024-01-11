import React, { useContext, useEffect, useState, useRef } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import SurveyItem from '../components/SurveyItem';
import SurveysFilterMobile from '../components/SurveysFilterMobile';
import PageButtons from '../components/PageButtons';
import SurveysFilter from '../components/SurveyFilter';
import Search from '../components/Search';
import autoAnimate from '@formkit/auto-animate'


const Surveys = () => {

    const [data, setData] = useState([]);
    const [allSurveys, setAllSurveys] = useState([]);

    const [indexFromSurvey, setIndexFromSurvey] = useState(0);
    const [indexToSurvey, setIndexToSurvey] = useState(12);


    const fetchData = async () => {
      let list = [];
      const querySnapshot = await getDocs(collection(db, "surveys"));
      querySnapshot.forEach((doc) => {
        list.push({...doc.data()})
      });
      setData(list);
      setAllSurveys(list)
    }

    useEffect(() => {
      fetchData()  
      
    }, [])
  
    useEffect(() => {
      console.log(data)
    }, [data])

    const parentRef = useRef(null)

    useEffect(() => {
        if (parentRef.current) {
        autoAnimate(parentRef.current);   
        }
    }, [parentRef])




  return (
    
    <div>
      <div className={`w-full min-h-[90vh] lg:flex pb-20 bg-[#e6e6e6]`}>
        
        <div className='lg:flex hidden'>
          <SurveysFilter data={data} setData={setData} allSurveys={allSurveys}/>
        </div>
        <div className='flex lg:hidden'>
          <SurveysFilterMobile data={data} setData={setData} allSurveys={allSurveys}/>
        </div>


        <div className='w-full h-full items-center justify-center flex flex-wrap' ref={parentRef}>
          <Search data={data} setData={setData} allSurveys={allSurveys}/>
          {
            data.filter((item, index) => index < indexToSurvey && index >= indexFromSurvey).map((survey, index) => 
              <SurveyItem key={index} index={index} surveys={data} setSurveys={setData} survey={survey}/>
              )

          }

        </div>  
        
      </div>
      <div className='fixed bottom-0 w-full'>
        <PageButtons data={data} indexFromSurvey={indexFromSurvey} setIndexFromSurvey={setIndexFromSurvey} indexToSurvey={indexToSurvey} setIndexToSurvey={setIndexToSurvey}/>
      </div>
    </div>

  )
}

export default Surveys