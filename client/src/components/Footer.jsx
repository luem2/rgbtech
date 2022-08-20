import React from 'react'
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { BsTelephone} from 'react-icons/bs';

export default function Footer() {
  return (
<footer className="text-center lg:text-left w-screen bg-gray-100 text-gray-600">
  <div className="mx-6 py-10 text-center md:text-left">
    <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="ml-20">
        <h6 className="
            uppercase
            font-semibold
            mb-4
            flex
            items-center
            justify-center
            md:justify-start
          ">
          Contacto
        </h6>
        <p className="flex items-center justify-center md:justify-start mb-4">
          <BsTelephone/> 
          <a href="#!" className="text-gray-600 ml-2">+57 3144048308</a>
        </p>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Servicioalcliente@rgbtech.com</a>
        </p>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Escribenos</a>
        </p>
      </div>
      <div className="ml-12">
        <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
          Ayuda
        </h6>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Medios de pago</a>
        </p>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Envios</a>
        </p>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Devoluciones</a>
        </p>
      </div>
      <div className="mr-10">
        <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
          Te puede interesar
        </h6>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Equipo gamer</a>
        </p>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Productos de Apple</a>
        </p>
        <p className="mb-4">
          <a href="#!" className="text-gray-600">Accesorios</a>
        </p>
      </div>
      <div className="ml-20 mt-4">
        <h6 className="uppercase font-semibold mb-4  flex justify-center md:justify-start">
          Siguenos
        </h6>
        <div className="flex gap-2 ml-1 mt-8">
        <p className="flex items-center justify-center md:justify-start mb-4 mr-1">
          <FaTwitter/>
        </p>
        <p className="flex items-center justify-center md:justify-start mb-4 mr-1">
            <FaInstagram/>
        </p>
        <p className="flex items-center justify-center md:justify-start mb-4 mr-1">
            <FaFacebook/>
        </p>
        </div>
        <p className="flex items-center justify-center md:justify-start">
        </p>
      </div>
    </div>
  </div>
  <div className="text-center p-6 bg-gray-200 flex justify-between">
  <span className='ml-12 text-gray-700'>Terminos y condiciones</span>
  <span className='mr-80 text-gray-700'>Politica de privacidad</span>
    <span className='mr-20 text-gray-700'>© 2022 Copyright: RGBTech</span>
  </div>
</footer>
  )
}
