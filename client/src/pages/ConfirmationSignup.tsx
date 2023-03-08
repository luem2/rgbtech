import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmationEmail } from '../store/slices/users/thunks';
import jwt from 'jwt-decode';
import { useDispatch } from 'react-redux';
import logo from '../assets/logo-dibujo-2.png';
import { emailConfirmatedNotification } from '../components/Notifications';

function ConfirmationSingup() {
  let { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  token = token.replaceAll("'", '.');
  const userInfo = jwt(token);

  return (
    <div>
      <div className='flex flex-col h-full w-full justify-center items-center'>
        <img className='w-32 mt-5' src={logo} alt='logo-rgbtech' />
        <div className='flex flex-col bg-white text-black justify-center items-center rounded-lg p-4 shadow-lg'>
          <h1 className='text-2xl font-bold'>Please verify your email</h1>
          <p>You're almost there! Just one more step</p>
          <p className='mb-4 font-semibold'>{userInfo.mail}</p>
          <p>
            Thank you for joining <b>RGBTech</b>!
          </p>
          <p className='mb-4'>
            Please click the button below to confirm your email.
          </p>
          <div className='flex gap-4'>
            <button
              type='button'
              className='inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'
              onClick={() => {
                dispatch(confirmationEmail(userInfo));
                navigate('/');
                emailConfirmatedNotification();
              }}
            >
              🚀 Confirm email
            </button>
          </div>
        </div>
        <div className='flex flex-col font-bold'>
          <div className='overflow-y-auto h-52'></div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationSingup;
