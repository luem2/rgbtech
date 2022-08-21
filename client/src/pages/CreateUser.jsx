import React , { useState } from "react";
import { postUser } from '../store/slices/users/thunks.js';
import { useDispatch } from 'react-redux';
import logo from '../assets/logo-dibujo-2.png'

const createUser = () => {
  const[previewSource,setPreviewSource]=useState();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
      user: "",
      password: '',
      mail: '',
      profilePhoto: '',
  })
  const[fileInputState,setFileInputState]=useState('');

  const previewFile =(file)=>{
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
          setPreviewSource(reader.result);
  }}; 
                              
      const handleFileInputChange=(e)=>{
          const file =e.target.files[0];
          console.log(file)
          previewFile(file);
      };

  function handleChange(e) {

      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
  };


  function  handleSubmit (e) {
      e.preventDefault();
      const postFinal = {
          user: input.user,
          password: input.password,
          mail: input.mail,
          profilePhoto:previewSource
      }
      dispatch(postUser(postFinal))
      setInput({
          user: "",
          password: '',
          mail: '',
          profilePhoto: '',
      })

}

    return (
        <div>
<div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div
        class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          class="p-4 py-6 text-white bg-blue-300 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div class="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">RGBTech</a>
          </div>
          <img src={logo} alt="" />
          <p class="flex flex-col items-center justify-center mt-2 text-center">
            <span>Have an account?</span>
            <a href="#" class="underline">Login!</a>
          </p>
          <p class="mt-6 text-sm text-center text-white">
            Read our <a href="#" class="underline">terms</a> and <a href="#" class="underline">conditions</a>
          </p>
        </div>
        <div class="p-5 bg-white md:flex-1">
          <div className="flex items-stretch">
          <div>
          <h3 class="my-4 text-2xl font-semibold text-gray-700">Create Account</h3>
          </div>
      {/*------------------------------------------IMG-PREWIEW--------------------------------------------------*/}
            <div>
            {previewSource &&(
                    <img src={previewSource} alt="chosen"
                    className="h-16 rounded-full ml-24"
                    />
                    )}
            </div>
            </div>
      {/*------------------------------------------FORM--------------------------------------------------*/}
          <form encType="multipart/form-data"  action="" onSubmit={(e) => handleSubmit(e)} class="flex flex-col space-y-5">
      {/*------------------------------------------USER------------------------------------------------*/}
            <div class="flex flex-col space-y-1">
              <label  class="text-sm font-semibold text-gray-500">User</label>
              <input
                type='text'
                value={input.user}
                name ="user"
                onChange={(e) => handleChange(e)}
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 "
              />
            </div>
    {/*------------------------------------------PASSWORD------------------------------------------------*/}
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
                {/* <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a> */}
              </div>
              <input
                 value={input.password}
                 type="password"
                 name='password'
                 onChange={(e) => handleChange(e)}
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 "
              />
            </div>
    {/*------------------------------------------MAIL------------------------------------------------*/}
    <div class="flex flex-col space-y-1">
              <label for="email" class="text-sm font-semibold text-gray-500">Email address</label>
              <input
                value={input.mail}
                type="mail"
                name='mail'
                onChange={(e) => handleChange(e)}
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 "
              />
            </div>
   { /*------------------------------------------PHOTO------------------------------------------------*/}
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <label  class="text-sm font-semibold text-gray-500">Photo</label>
                {/* <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a> */}
              </div>
              <input
                value={fileInputState}
                type="file"
                name='image'
                onChange={(e) => handleFileInputChange(e)}
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 "
              />
            </div>
            <div>
              <button
                type="submit" 
                class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-300 rounded-md shadow hover:bg-blue-400 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Singup
              </button>
            </div>
            <button
						className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						type="button"
						>
              <a href="/">Back Home</a>
								
						</button>
          </form>
        </div>
      </div>
    </div>
        </div>
    )
} 

export default createUser;