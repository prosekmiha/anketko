import React, { useState, useEffect, useContext } from 'react'
import SurveyItemVotes from './SurveyItemVotes';
import { Link } from 'react-router-dom'
import SurveyPage from '../pages/SurveyPage';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import { Context } from '../App';



const SurveyItem = ({ survey, index, surveys, setSurveys }) => {

  const [surveyOptions, setSurveyOptions] = useState(survey.options);
  const [newOption, setNewOption] = useState("");

  const { currentUser } = useContext(Context);


  const addNewOption = () => {
    if(newOption != ""){
      let list = surveyOptions;
      const newOptionObj = {option: newOption, voteCounter: 0, usersVotes: [], user: currentUser}
      list.push(newOptionObj);
      setSurveyOptions(list);
      setNewOption("")
      update()
    }
  }


  const update = async() => {     
    const surveyDocRef = doc(db, "surveys", survey.id);
    await updateDoc(surveyDocRef, {
      options: surveyOptions,
      
    })

  }

  

  return (
    

      <div className='w-[400px] h-[500px] flex flex-col border border-slate-200 p-8 pl-10 pr-10 my-4 rounded-sm m-3 text-left bg-white shadow-lg hover:shadow-xl'>
        <div className='flex justify-between border-b border-b-grey mb-2 pb-1'>
          <p>Objavil: {survey.user}</p>
          <p>{survey.timestamp}</p>       
        </div>
          <p className='text-md font-semibold'>{survey.category}</p>
          <div className='w-full h-fit relative mb-4'>
              <p className='text-2xl'>{survey.question}</p>
          </div>
          <div className='h-full overflow-auto mb-3'>
            {
              survey.options.map((item, index) => 
                  <SurveyItemVotes  key={index} item={item} index={index} survey={survey} />
              
              )
            }
          
          </div>   
          
          <div className='flex justify-end'>
            <Link className="flex w-[60px] justify-center rounded-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" to={survey.id} state={{ survey }} element={<SurveyPage/>}>Odpri</Link>
          </div>
          
      </div>


  )
}

export default SurveyItem