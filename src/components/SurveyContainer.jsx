import React from 'react'
import SurveyItem from './SurveyItem'
import SurveyChart from './SurveyChart'

const SurveyContainer = ({ index, surveys, setSurveys, survey }) => {
  return (
    <div className='w-full flex bg-slate-100 rounded-xl mb-5 justify-around'>

        <SurveyItem index={index} surveys={survey} setSurveys={setSurveys} survey={survey}/>
        <SurveyChart />
    </div>
  )
}

export default SurveyContainer