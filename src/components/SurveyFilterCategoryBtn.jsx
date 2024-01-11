import React, { useEffect, useState } from 'react'

const SurveyFilterCategoryBtn = ({ index, category, data, setData, allSurveys, pressedIndex, setPressedIndex }) => {

  const [btnStyle, setBtnStyle] = useState("")
  
  useEffect(() => {
    pressedIndex == index ? setBtnStyle("border-b border-b-black") : setBtnStyle("")
  })

    const handleFilterClick = (filter, index) => {   
      setPressedIndex(index)
        if(filter == "Vse") {
          setData(allSurveys)
      } else {
          setData(allSurveys.filter((survey) => survey.category.includes(filter)))
      }
      }

  return (
    <div onClick={() => {handleFilterClick(category, index)}} className={`flex items-center justify-center w-11/12 cursor-pointer pt-6 pb-6 mb-3 hover:bg-slate-100 h-[40px] font-semibold ${btnStyle}`}>{category}</div>
  )
}

export default SurveyFilterCategoryBtn