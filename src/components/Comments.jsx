import React, { useContext, useState } from 'react'
import CommentItem from './CommentItem'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';

const Comments = ({ survey }) => {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(survey.comments);
    const {currentUser} = useContext(Context);
    
    const [date, setDate] = useState(new Date().toLocaleString() + "");

    const navigate = useNavigate();

    const handleAdd = () => {
        if(currentUser) { 
            let com = comments;  
            const commentObj = { comment: comment, user: currentUser, timestamp: date };
            setComment("");
            com.push(commentObj);
            setComments(com);       
            updateComments();
        } else {
            navigate("/login")
        }
      }

    const updateComments = async() => {
        const surveyDocRef = doc(db, "surveys", survey.id);
        await updateDoc(surveyDocRef, {
            comments: comments,
        
        })
    }


  return (
    <div className='w-full h-full p-8 bg-white rounded-sm shadow-lg mb-10'>
        <h1 className='text-left mb-5 text-xl'>Komentarji</h1>
        <div className='flex gap-1 items-center'>
            <input onChange={(e) => setComment(e.target.value)} value={comment} type='text' className="h-[45px] block w-full rounded-sm border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"/>
            <button onClick={() => handleAdd()} className="flex h-[44px] w-[100px] justify-center rounded-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center">
                Dodaj
            </button>
        </div>
        <div className='w-full mt-5'>
            {survey.comments &&
            survey.comments.map((item, index) => 
                <CommentItem key={index} index={index} survey={survey} comment={item} currentUser={currentUser} coms={comments} setComs={setComments} />
            )}
        </div>
        
        
    </div>
  )
}

export default Comments