import React from "react";
import { useEffect } from "react";
import { GoPrimitiveDot } from 'react-icons/go';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function ModalHome() {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    setShowModal(true)
  }, [])

  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              
                {/*header*/}
                
                {/*body*/}
                    <div>
       <h1>
         {/* <!-- Container for demo purpose --> */}
 <div class="container my-24 px-6 mx-auto">

  {/* <!-- Section: Design Block --> */}
   <section class="mb-32 text-gray-800 text-center md:text-left">
     <div class="block rounded-lg shadow-lg bg-white">
     <div class="flex flex-wrap items-center">
       {/* <div class="grow-0 shrink-0 basis-auto block lg:flex w-full lg:w-6/12 xl:w-4/12">
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/126.jpg" alt="Trendy Pants and Shoes"
            class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
        </div> */}
        <div class="grow-0 shrink-0 basis-auto w-full">
            <div className="absolute flex justify-end right-7 mt-1">
                <button className=" rounded-full" onClick={() => setShowModal(false)}><AiFillCloseCircle size={30}/></button>
            </div>
          <div class="px-6 py-12 md:px-12">
            <h2 class="text-3xl text-pink-500 font-bold mb-6 pb-2">welcome to RGBTech</h2>
            <p class="text-gray-500 mb-6 pb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A soluta corporis
              voluptate ab error quam dolores doloremque, quae consectetur.
            </p>
            <div class="flex flex-wrap mb-6">
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                    <div className="mr-2">
                        <GoPrimitiveDot/>
                    </div>
                  Guarda tus productos favoritos
                </p>
              </div>
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                <div className="mr-2">
                    <GoPrimitiveDot/>
                </div>rapido y sencillo
                </p>
              </div>
              <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
                <p class="flex items-center justify-center md:justify-start">
                <div className="mr-2">
                        <GoPrimitiveDot/>
                    </div>Gana puntos al comprar. 
                </p>
              </div>
              <div class="w-full lg:w-6/12   mb-4">
                <p class="flex items-center justify-center md:justify-start">
                <div className="mr-2">
                        <GoPrimitiveDot/>
                    </div>Los ultimos productos de tecnologia en un solo lugar.
                </p>
              </div>
              
              <div class="ml-28  mb-4">
                <p class="flex items-center justify-center md:justify-start">
                <div className="mr-2">
                        <GoPrimitiveDot/>
                    </div>Comfortable
                </p>
              </div>
            </div>
            <button type="button"
              class="inline-block px-7 py-3 bg-white text-pink-500 border border-pink-500  font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-pink-500  hover:shadow-lg hover:text-white focus:bg-pink-500  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">
              Login
            </button>
            <button type="button"
              class="inline-block ml-8 px-7 py-3 bg-white text-pink-500 border border-pink-500  font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-pink-500  hover:shadow-lg hover:text-white focus:bg-pink-500  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">
              register
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <!-- Section: Design Block --> */}

</div>
{/* <!-- Container for demo purpose --> */}
        </h1>
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











// import React from 'react'

// export default function ModalHome() {
//   return (
//     <div>
//         <h1>
//         {/* <!-- Container for demo purpose --> */}
// <div class="container my-24 px-6 mx-auto">

//   {/* <!-- Section: Design Block --> */}
//   <section class="mb-32 text-gray-800 text-center md:text-left">
//     <div class="block rounded-lg shadow-lg bg-white">
//       <div class="flex flex-wrap items-center">
//         <div class="grow-0 shrink-0 basis-auto block lg:flex w-full lg:w-6/12 xl:w-4/12">
//           <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/126.jpg" alt="Trendy Pants and Shoes"
//             class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
//         </div>
//         <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
//           <div class="px-6 py-12 md:px-12">
//             <h2 class="text-3xl font-bold mb-6 pb-2">welcome to RGBTech</h2>
//             <p class="text-gray-500 mb-6 pb-2">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. A soluta corporis
//               voluptate ab error quam dolores doloremque, quae consectetur.
//             </p>
//             <div class="flex flex-wrap mb-6">
//               <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
//                 <p class="flex items-center justify-center md:justify-start">
//                   <svg class="w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                     <path fill="currentColor"
//                       d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
//                     </path>
//                   </svg>Guarda tus productos favoritos
//                 </p>
//               </div>
//               <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
//                 <p class="flex items-center justify-center md:justify-start">
//                   <svg class="w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                     <path fill="currentColor"
//                       d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
//                     </path>
//                   </svg>rapido y sencillo
//                 </p>
//               </div>
//               <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
//                 <p class="flex items-center justify-center md:justify-start">
//                   <svg class="w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                     <path fill="currentColor"
//                       d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
//                     </path>
//                   </svg>Sistema de puntos 
//                 </p>
//               </div>
//               <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
//                 <p class="flex items-center justify-center md:justify-start">
//                   <svg class="w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                     <path fill="currentColor"
//                       d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
//                     </path>
//                   </svg>xxxxxxx
//                 </p>
//               </div>
//               <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
//                 <p class="flex items-center justify-center md:justify-start">
//                   <svg class="w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                     <path fill="currentColor"
//                       d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
//                     </path>
//                   </svg>xxxxxxx
//                 </p>
//               </div>
//               <div class="w-full lg:w-6/12 xl:w-4/12 mb-4">
//                 <p class="flex items-center justify-center md:justify-start">
//                   <svg class="w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                     <path fill="currentColor"
//                       d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
//                     </path>
//                   </svg>Comfortable
//                 </p>
//               </div>
//             </div>
//             <button type="button"
//               class="inline-block px-7 py-3 bg-gray-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
//               Login
//             </button>
//             <button type="button"
//               class="inline-block ml-8 px-7 py-3 bg-gray-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
//               register
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* <!-- Section: Design Block --> */}

// </div>
// {/* <!-- Container for demo purpose --> */}
//         </h1>
//     </div>
//   )
// }
