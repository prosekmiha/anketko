import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';



const SurveyChart = ({ survey }) => {

  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState([]);
  

  let optionsList = [];
  let votesList = [];

  const updateOptions = () => {
    survey.options.forEach((option) => {optionsList.push(option.option)})
    setOptions(optionsList)
  }
  const updateCounter = () => {
    survey.options.forEach((option) => {votesList.push(option.voteCounter)})
    setVotes(votesList)
  }

  useEffect(() => {
    updateOptions();
    updateCounter();
    refreshVotes();
  }, [])
  
  const refreshVotes = () => {
    
      let vot = [];
      let opt = []
      survey.options.forEach((option) => {
        vot.push(option.voteCounter)
      })
      if(vot != votes){
        setVotes(vot)
      }

      survey.options.forEach((option) => {
        opt.push(option.option)
      })
      if(options != opt){
        setOptions(opt)
      }
      setTimeout(function(){refreshVotes()}, 1000)
    }


  

    ChartJS.register(ArcElement, Tooltip, Legend);
    
    const data = {
        labels: options,
        datasets: [
          {
            data: votes,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              'rgba(105, 209, 102, 1)',
              'rgba(207, 114, 183, 1)',
              'rgba(71, 201, 10, 1)',
              'rgba(5, 86, 237, 1)',
              'rgba(194, 247, 0, 1)',
              'rgba(173, 69, 92, 1)',
            ],
            borderColor: [
              'white',
              'white'
,
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    <div className='w-[450px] h-[500px] flex flex-col justify-evenly p-3 bg-white my-4 m-1.5 rounded-sm shadow-lg text-left'>
        <Doughnut data={data} />
    </div>
  )
}

export default SurveyChart