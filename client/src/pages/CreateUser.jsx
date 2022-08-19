import React , { useState } from "react";
import { postUser } from '../store/slices/users/thunks.js';
import { useDispatch } from 'react-redux';

const createUser = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        user: "",
        password: '',
        mail: '',
        profilePhoto: '',
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })};


    function handleSubmit(e) {
        e.preventDefault();
        const postFinal = {
            user: input.user,
            password: input.password,
            mail: input.mail,
            profilePhoto: input.profilePhoto,
        }
        dispatch(postUser(postFinal))
        setInput({
            user: "",
            password: '',
            mail: '',
            profilePhoto: '',
        })

}
    return (
            <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Crea tu Usuario</h1>
                <div >
                    <label>User : </label>
                    <input
                        type='text'
                        value={input.user}
                        required
                        name ="user"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div >
                    <label>Password</label>
                    <input
                        value={input.password}
                        type="password"
                        required
                        name='password'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div >
                    <label> Mail: </label>
                    <input
                        value={input.mail}
                        type="mail"
                        required
                        name='mail'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div >
                <label>Photo:</label>
                    <input
                        value={input.profilePhoto}
                        type="text"
                        required
                        name='profilePhoto'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type="submit">Enviar</button>
                </form>
    )
} 

export default createUser;