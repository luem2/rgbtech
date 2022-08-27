import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {
	setLoginFalse,
	setWelcomeUserTrue,
} from "../store/slices/components/componentSlice";
import {getLoggedUser} from '../store/slices/users/userSlice'
import { useDispatch } from 'react-redux';

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

export const useForm = (initalForm, validateForm) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(initalForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleChange = (event) => {
    const {name, value} = event.target
      setForm({
        ...form,
        [name]: value
      })
    }
  const handleBlur = () => {
    setErrors(validateForm(form))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const requestBody = {
      user: form.user,
      password: form.password
    }
    axios.post('/users/login', requestBody)
    .then(response => {
      setResponse({status: 'success'})
      const token = response.data.token;
      window.localStorage.setItem("token", token);
      setAuthToken(token);
      const user = jwt_decode(token)
      dispatch(getLoggedUser(user))
      dispatch(setLoginFalse());
			dispatch(setWelcomeUserTrue());
    })
    .catch (
      setResponse({status: 'error'})
    )
    setForm(initalForm)
  }
  return {
    form, 
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit
  }
}
