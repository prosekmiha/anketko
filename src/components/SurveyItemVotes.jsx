import React, { useContext, useEffect, useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';



const SurveyItemVotes = ({ item, index, survey }) => {

    const navigate = useNavigate();

    const {currentUser} = useContext(Context)

    const [surveyOptionsCounter, setSurveyOptionsCounter] = useState(item.voteCounter)
    const [surveyOptions, setSurveyOptions] = useState(survey.options)
    const [surveyOption, setSurveyOption] = useState(surveyOptions[index])
    const [usersVotes, setUsersVotes] = useState(surveyOptions[index].usersVotes)

    const [borderColor, setBorderColor] = useState();

    useEffect(() => {
      usersVotes.includes(currentUser) ? setBorderColor("border-emerald-600 border-2") : setBorderColor("border-slate-700 border");
    }, [])

    
    function changeSurveyOptions(){
      if(currentUser) {
        let so = surveyOption;
        let uv = usersVotes;
        if(usersVotes.includes(currentUser)){
            so.voteCounter -= 1;

            const index = uv.indexOf(currentUser);
            const x = uv.splice(index, 1);
            setBorderColor("border-slate-700 border")
        } else {
            so.voteCounter += 1;

            uv.push(currentUser);
            setBorderColor("border-emerald-600 border-2")
        }


        let list = surveyOptions;
        const replacingObj = {option: so.option, voteCounter: so.voteCounter, usersVotes: uv}
        list[index] = replacingObj
        setSurveyOptions(list);
        setSurveyOptionsCounter(so.voteCounter)
        console.log(surveyOptions)
        update()
      } else {
        navigate("/login")
      }
    }
    


    const update = async() => {     

      const surveyDocRef = doc(db, "surveys", survey.id);
      await updateDoc(surveyDocRef, {
        options: surveyOptions,
        
      })

    }


  return (
    <div className="flex justify-center align-center">
        <div onClick={() => changeSurveyOptions()} className={`flex items-center align-center justify-between w-full h-full py-2.5 px-5 me-1 mb-4 text-sm font-medium text-gray-900 bg-white rounded-sm hover:bg-gray-100 hover:text-blue-700 cursor-pointer ${borderColor}`}>
          {item.option}
          {item.user && <span className='text-xs text-gray-600'>Dodal: {item.user}</span>}
        </div>
        <div className="h-[42px] w-[50px] mr-2 flex justify-center align-center items-center rounded-sm text-sm font-semibold leading-6 text-white shadow-sm bg-blue-600 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{surveyOptionsCounter}</div>
    </div>
  )
}

export default SurveyItemVotes