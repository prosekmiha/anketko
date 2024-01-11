import React, { useState, useEffect } from 'react'

const Search = ({ data, setData, allSurveys }) => {

    const [search, setSearch] = useState("");


    useEffect(() => {
      handleSearch();
    }, [search])

    const handleSearch = () => {     
        const searched = allSurveys.filter(
            (item) => item.question.toLowerCase().includes(search)            
        );          
        setData(searched);
        
    }

  return (
    <div className='w-full'>
      <input className='w-[250px] h-[45px] p-2 rounded-sm border shadow-lg mt-2' value={search} onChange={(e) => {setSearch(e.target.value.toLowerCase())}} placeholder='Poišči vprašanje' type='text' />
    </div>
  )
}

export default Search