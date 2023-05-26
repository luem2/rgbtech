import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { getUserProfile, setCartShop } from '../../store/slices/users/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFavorite } from '../../store/slices/products/productSlice';
import axios from 'axios';
import { setAuthToken } from '../../store/slices/users/thunks';
import { welcomeUserNotification } from '../Notifications';

function LoguinGoogle({ closeModal }) {
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.guestShoppingCart);
  const carts = cart.map(product => product);
  const dispatch = useDispatch();

  function handleCallbackResponse(response) {
    const token = response.credential;
    const { email, picture, given_name, family_name, sub } = jwt_decode(token);
    document.getElementById('signInDiv').hidden = true;
    const bodyPost = {
      user: `${given_name} ${family_name}`,
      mail: email,
      profilePhoto: picture,
      password: sub,
    };
    axios
      .post('/users/registerGoogle', bodyPost)
      .then(response => {
        const token = response.data.token;
        window.localStorage.setItem('token', token);
        setAuthToken(token);
        const user = jwt_decode(token);
        if (cart.length) {
          dispatch(setCartShop(carts));
        }
        dispatch(getUserProfile(user.id));
        if (user.favorite) {
          dispatch(setFavorite(user.favorite));
        }
        navigate('/');
        welcomeUserNotification();
        closeModal();
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '319669614492-8uf24oeb7gbr3lf3nvutbcjjctgqg8l2.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <div id='signInDiv'></div>
    </div>
  );
}

export default LoguinGoogle;
