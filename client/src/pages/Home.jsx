import React from 'react';
import Logo from '../components/Logo/Logo.jsx';
import Products from '../components/Products.jsx';
import SearchBar from '../components/Searchbar.jsx';

const Home = () => {
  return (
    <div className='bg-gray-900 min-h-screen grid place-content-center'>
      <SearchBar/>
      <br />
      <br />
      <Products/>
      <br />
      <Logo />
    </div>
  );
};

export default Home;
