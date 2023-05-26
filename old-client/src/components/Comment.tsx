import React from 'react'
import { ImQuotesRight} from 'react-icons/im';

const Comment = ({rating, profilePhoto, user, comment}) => {
  return (
    <div className='grid palce-items-center'>
      <div className='grid grid-cols-1 p-10 gap-10 '>
        <figure className='w-80 bg-white rounded-2xl shadow-lg overflow-hidden  transition duration-200'>
          <blockquote className='p-8'>
            <div className='mb-5 text-black items-center text-2xl font-bold  w-12'>
              <p>{rating}</p>
            </div>
            <p className=' text-lg text-black'>
              {comment}
            </p>
          </blockquote>
          <div className='flex items-center justify-between px-8 py-1 bg-gradient-to-br from-fuchsia-500
          to-pink-500'>
            <div className='flex items-center gap-5'>
              <div className='rounded-full border-4 w-14 h-14 border-white'>
                <img className='rounded-full' src={profilePhoto} alt="user" />
              </div>
              <figcaption className='text-white font-semibold text-2xl'>
                <div>{user}</div>
                {/* <div className='opacty-70'>Front-End Developer</div> */}
              </figcaption>
            </div>
            <div className='text-2xl '>
              <ImQuotesRight/>
            </div>
          </div>
        </figure>
      </div>
    </div>
  )
}
export default Comment