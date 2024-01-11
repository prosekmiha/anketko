import React, { useEffect, useState } from 'react'
import SurveyFilterCategoryBtn from './SurveyFilterCategoryBtn'

const SurveysFilter = ({ data, setData, allSurveys }) => {

  const categories = ["Vse", "Pomoč in nasveti", "Kaj kupiti", "Problemi človeštva", "Kriptovalute", "Umetnost", "Šola", "Šport", "Na cesti", "Razno"];
  const [filter, setFilter] = useState(true);

  const [pressedIndex, setPressedIndex] = useState();
  

  return (
    <div className={`w-full h-fit flex flex-col p-5 items-center shadow-md bg-white rounded-sm`}>
        <h1 className='mb-4 font-bold border-b w-full pb-2'>Kategorije</h1>
        {categories.map((category, index) => 
            <SurveyFilterCategoryBtn key={index} index={index} category={category} data={data} setData={setData} allSurveys={allSurveys} pressedIndex={pressedIndex} setPressedIndex={setPressedIndex}/> 
        )}

    </div>
  )
}

export default SurveysFilter