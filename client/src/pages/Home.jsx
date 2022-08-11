import React from 'react';
import Astronauta from '@/assets/astronauta.png';

const Home = () => {
  return (
    <div className='bg-gray-900 min-h-screen grid place-content-center'>
      <h1 className='text-7xl text-white '>Welcome to RGB Tech</h1>
      <img src={Astronauta} alt='astronauta' />
    </div>
  );
};

export default Home;
