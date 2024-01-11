import React, { useContext, useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, collection, doc } from "firebase/firestore"; 
import { auth, db } from "../firebase"
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import SnackbarLoginSuccess from '../components/SnackbarSignUpSucces';

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const navigate = useNavigate()

  const {currentUser, setCurrentUser} = useContext(Context)

  const [snackbar, setSnackbar] = useState(false);
  const [error, setError] = useState(false);
  
  const getUsername = async(email) => {
    let list = "";
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if(email == doc.data().email){
        list = doc.data().username;
        sessionStorage.setItem("user", doc.data().username)
        setCurrentUser(doc.data().username)
      }   
    });  
    setUsername(list)
  }


  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

    const user = userCredential.user;
    getUsername(user.email);
    setCurrentUser(username);

    navigate("/")
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setWrongData("Napačen e-mail naslov ali geslo!")
  });
  }

  const [wrongData, setWrongData] = useState("");

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Prijava
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                E-poštni naslov
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email" 
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder='Testni: test@test.si'
                  required
                  className="block w-full rounded-sm border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Geslo
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Testni: test123"
                  required
                  className="block w-full rounded-sm border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Prijava
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Še nisi registriran? {" "}
            <Link to="/signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-700">
              Registracija
            </Link>
          </p>
          <p className="text-md font-medium leading-6 text-red-600 mt-5">
            {wrongData}
          </p>
        </div>
        <SnackbarLoginSuccess snackbar={snackbar} />
      </div>
  )
}

export default Login