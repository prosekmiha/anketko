import React, { useContext, useState } from 'react'
import { Context } from '../App'
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"
import Modal from '@mui/material/Modal';


const SurveyPageDock = ({ survey }) => {

    const {currentUser} = useContext(Context);

    const navigate = useNavigate();

    const deleteSurvey = async(id) => {
        await deleteDoc(doc(db, "surveys", id));
        navigate("/questions")
      }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div className='h-full w-full p-2 mt-3 bg-white rounded-sm shadow-lg flex flex-row justify-between items-center'>
        <p className='font-semibold'>Objavil: {survey.user}</p>
        <div className='flex items-center gap-2'>
            <p className='font-semibold'>{survey.timestamp}</p>
            {currentUser == survey.user &&
                <button onClick={handleOpen} className="flex justify-center rounded-sm bg-blue-600 hover:bg-blue-700 px-2 text-[12px] font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center m-1">
                    Izbriši
                </button>
            }
       </div>

       <Modal
        open={open}
        onClose={handleClose}
        > 
        <div className='w-[300px] h-[200px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border rounded-sm p-4 bg-white flex flex-col justify-center align-center'>      
          <p className='text-xl font-semibold mb-5'>
            Želite izbrisati vprašanje?
          </p>
          <div className='flex flex-row justify-center'>
            <button onClick={() => deleteSurvey(survey.id)} className='btn h-12 w-15 text-white bg-blue-600 hover:bg-blue-700 m-2'>Da</button>
            <button onClick={handleClose} className='btn h-12 w-15 text-white bg-gray-900 hover:bg-gray-800 m-2'>Ne</button>
          </div>      
        </div>  
        

      </Modal>

    </div>
  )
}

export default SurveyPageDock