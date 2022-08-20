import React from "react";
import { BsGoogle } from 'react-icons/bs';


export default function Login2() {


  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open 
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
                {/*header*/}
                {/*body*/}
                <div>
      <div class="flex items-cente lg:justify-center">
  <div class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
    <div class="p-4 py-6 text-white bg-pink-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
      <div class="my-3 text-4xl font-bold tracking-wider text-center">
        <a href="#">RGBTech</a>
      </div>
      <p class="mt-6 font-normal text-center text-gray-300 md:mt-0">
        Lorem ipsum dolor sit amet consectetur sunt incidunt 
        tempora repellendus impedit voluptatum quos corporis doloremque.
      </p>
      <p class="flex flex-col items-center justify-center mt-10 text-center">
        <span>Don't have an account?</span>
        <a href="#" class="underline">Get Started!</a>
      </p>
      <p class="mt-6 text-sm text-center text-gray-300">
        Read our <a href="#" class="underline">terms</a> and <a href="#" class="underline">conditions</a>
      </p>
    </div>
    <div class="p-5 bg-white md:flex-1">
      <h3 class="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
      <form action="#" class="flex flex-col space-y-5">
        <div class="flex flex-col space-y-1">
          <label for="email" class="text-sm font-semibold text-gray-500">Email address</label>
          <input type="email" id="email" autofocus class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-pink-100" />
        </div>
        <div class="flex flex-col space-y-1">
          <div class="flex items-center justify-between">
            <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
            <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
          </div>
          <input type="password" id="password" class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-pink-100" />
        </div>
        <div>
          <button type="submit" class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-pink-500 rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
            Log in
          </button>
        </div>
        <div class="flex flex-col space-y-5">
          <span class="flex items-center justify-center space-x-2">
            <span class="h-px bg-gray-400 w-14"></span>
            <span class="font-normal text-gray-500">or login with</span>
            <span class="h-px bg-gray-400 w-14"></span>
          </span>
          <div class="flex flex-col space-y-4">
            <a href="#" class="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group focus:outline-none">
              <BsGoogle/>
              <span class="text-sm font-medium text-black ">Google</span>
            </a>
            <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
                {/*footer*/}
              </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}