import React, { useContext, useEffect, useState } from 'react'
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore"; 
import { db } from '../firebase'
import SnackbarNewSurvey from "../components/SnackbarNewSurvey"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ComboBox from '../components/ComboBox';
import { Context } from '../App';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NewSurvey = () => {

  const categories = ["Pomoč in nasveti", "Kaj kupiti", "Problemi človeštva", "Kriptovalute", "Umetnost", "Šola", "Šport", "Na cesti", "Razno"]

  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [options, setOptions] = useState([]);  
  const [date, setDate] = useState(new Date().toLocaleString() + "");

  useEffect(() => {
    setQuestion(question.charAt(0).toUpperCase() + question.slice(1))
  }, [question])

  const {currentUser, setCurrentUser} = useContext(Context);

  const [snackbar, setSnackbar] = useState(false);
  const [error, setError] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if(question != "") {
      try {
        const docRef = await addDoc(collection(db, "surveys"), {    
          id: "",
          question: question,
          category: category,
          options: options,
          comments: [],
          timestamp: date,
          user: currentUser       
        });
        console.log("Document written with ID: ", docRef.id);
        const newDocRef = doc(db, "surveys", docRef.id);
        await updateDoc(newDocRef, {
          id: docRef.id
        });

        setSnackbar(true);
        setError(false);

        setQuestion("");
        setCategory(categories[0]);
        setOptions([]);
        setOption("");

      } catch (e) {
        console.error("Error adding document: ", e);
        setSnackbar(true);
        setError(true);  
      }
      setTimeout(function() {setSnackbar(false), setError(false);}, 3000)
    }
  }

  function addOption() {
    if(option != "") {
      setOptions(options => [...options, {option: option, voteCounter: 0, usersVotes: []}]);
    }  
    setOption("")
  }

  function deleteOption(index) {
    setOptions(options => options.filter((o, i) => i != index))
  }

  const [option, setOption] = useState("");

  return (
    <div className='mt-10 mx-auto w-full max-w-sm'>
        <p className='text-2xl font-bold mb-10'>Objavi vprašanje</p>
        <form onSubmit={handleAdd} className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium text-gray-900 text-left">
                Vprašanje
              </label>
              <div className="mt-2 min-h-full">
                <input onChange={(e) => setQuestion(e.target.value)} value={question} type="text" className="h-[45px] block w-full rounded-sm border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 text-left">
                Kategorija
              </label>
              <div className="mt-2">
                <ComboBox data={categories} state={category} setState={setCategory} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 text-left">
                Možnosti
              </label>
              <div className='mt-2 w-full'>
                {options.map((item, index) => 
                  <div className='flex' key={index}>
                    <div className='w-full py-2.5 px-5 me-1 mb-2 text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-blue-700'>{item.option}</div>
                    <div onClick={() => deleteOption(index)} className='px-2 py-1.5 me-1 mb-2 bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-blue-700 cursor-pointer'><DeleteForeverIcon/></div>
                  </div>
                  )}
                <div className="mt-2 flex">
                  <input onChange={(e) => setOption(e.target.value)} value={option} type="text" className="block w-full rounded-sm border-0 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  <button type="button" onClick={() => addOption()} className="flex m-0.5 ml-1 rounded-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Dodaj</button>
                </div>
              </div>
              <label className="block text-[12px] font-semibold mt-1 text-gray-900 text-left">
                Dodaj vsaj 3 možnosti
              </label>
            </div>
            
           
            <div>
              <button type="submit" className="flex w-full justify-center rounded-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Ustvari anketo
              </button>
            </div>
          </form>
          <SnackbarNewSurvey snackbar={snackbar} error={error}/>
    </div>
  )
}

export default NewSurvey