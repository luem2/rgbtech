import React from 'react';
import rgbTechLogo from '../../assets/logo-dibujo-2.png';
import style from './Logo.module.css';

const Logo = () => {
  return (
    <div className={style.container}>
      <img src={rgbTechLogo} alt='logo-rgbtech' />
      <span className={style.rgb}>RGB</span>
      <span className={style.tech}>Tech</span>
    </div>
  );
};

export default Logo;
