import React, {useContext, useState} from 'react'
import SurveyItemVotes from '../components/SurveyItemVotes';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';

const SurveyPageItem = ({ survey }) => {

  const [surveyOptions, setSurveyOptions] = useState(survey.options);
  const [newOption, setNewOption] = useState("");

  const {currentUser} = useContext(Context);
  

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
    <div className='w-[450px] h-[500px] flex flex-col p-8 pl-10 pr-10 bg-white rounded-sm shadow-lg m-1.5 text-left '>
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
          <div className="mt-2 flex">
            <input onChange={(e) => setNewOption(e.target.value)} value={newOption} placeholder="Dodaj možnost" type="text" className="block w-full rounded-sm border-0 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-600 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"/>
            <button onClick={() => addNewOption()} type="button" className="flex m-0.5 ml-1 rounded-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Dodaj</button>
          </div>
          

      </div>
  )
}

export default SurveyPageItem