import React, { useState } from 'react'
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase"

const CommentItem = ({ index, survey, comment, currentUser, coms, setComs }) => {

  const [comments, setComments] = useState(coms);

  const deleteComment = (user, commen, time) => {
    
    let list = coms;
    list.forEach((item, index) => {
      if(item.user == user && item.comment == commen && item.timestamp == time) {
        list.splice(index, 1);
      }
    })


    setComs(list)
    setComments(list);
    updateComments();
    fetchData();

   

  }


const updateComments = async() => {
  const surveyDocRef = doc(db, "surveys", survey.id);
  await updateDoc(surveyDocRef, {
      comments: coms,
    
  })
}

const fetchData = async () => {
  let list = [];
  const querySnapshot = await getDocs(collection(db, "surveys"));
  querySnapshot.forEach((doc) => {
    list.push({...doc.data()})
  });
  setComments(list[0]);
  setComs(list[0]);
  location.reload();
}
  
  return (
    <div className='w-full h-full p-1 bg-neutral-50 border-slate-300 border shadow-sm rounded-sm mb-5'>
      <div className='flex justify-between border-b border-gray-300 p-1'>
        <div>Objavil: {comment.user}</div>
        <div>{comment.timestamp}</div>
        
      </div>
      <div className='pt-2 pl-2 flex h-[50px] text-lg'>{comment.comment}</div>
      <div className='flex justify-end'>
        {currentUser == comment.user &&
          <button onClick={() => deleteComment(comment.user, comment.comment, comment.timestamp)} className="flex justify-center rounded-sm bg-blue-600 hover:bg-blue-700 px-2 text-[12px] font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center m-1">
            Izbriši
          </button>
        }
      </div>
    </div>
  )
}

export default CommentItem