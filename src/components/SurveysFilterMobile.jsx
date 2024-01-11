import React, { useEffect, useState } from 'react'
import SurveyFilterCategoryBtn from './SurveyFilterCategoryBtn'

const SurveysFilterMobile = ({ data, setData, allSurveys }) => {

  const categories = ["Vse", "Pomoč in nasveti", "Kaj kupiti", "Problemi človeštva", "Kriptovalute", "Umetnost", "Šola", "Šport", "Na cesti", "Razno"];
  const [filter, setFilter] = useState(false);

  const [pressedIndex, setPressedIndex] = useState();
  

  return (
    <div className={`w-full h-fit ${filter ? "flex" : "hidden"} flex-col p-5 mt-4 items-center shadow-md bg-white border border-slate-200 rounded-sm`}>
        <h1 className='mb-4 font-bold border-b w-full pb-2'>Kategorije</h1>
        {categories.map((category, index) => 
            <SurveyFilterCategoryBtn key={index} index={index} category={category} data={data} setData={setData} allSurveys={allSurveys} pressedIndex={pressedIndex} setPressedIndex={setPressedIndex}/> 
        )}
        <div className='flex lg:hidden w-full justify-end'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
            <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
          </svg>

        </div>
    </div>
  )
}

export default SurveysFilterMobile