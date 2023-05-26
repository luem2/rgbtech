import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-600'>
      <div className='flex flex-row justify-around gap-4 m-4'>
        <div className=''>
          <h6
            className='
            uppercase
            font-semibold
            mb-4
            flex
            items-center
						text-center
            justify-center
            md:justify-start
          '
          >
            Contact
          </h6>
          <p className='mb-4 text-center'>
            <Link to='/about' className='text-gray-600'>
              About team
            </Link>
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h6 className='uppercase text-center font-semibold mb-4 flex justify-center'>
            Support
          </h6>
          <p className='mb-4 text-center'>
            <a href='#!' className='text-gray-600'>
              Payment methods
            </a>
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h6 className='uppercase font-semibold mb-4 text-center'>
            Our Background
          </h6>
          <p className='text-center mb-4'>
            <a
              target='_blank'
              href='https://www.soyhenry.com/'
              className='text-gray-600 text-center'
            >
              Henry Bootcamp
            </a>
          </p>
        </div>
      </div>
      <div className='text-center p-4 bg-gray-200 dark:bg-black flex justify-between'>
        <span className=' text-gray-700'>Terms and Conditions</span>
        <span className=' text-gray-700'>Privacy Policy</span>
        <span className='text-gray-700'>© 2022 Copyright: RGBTech</span>
      </div>
    </footer>
  );
}
