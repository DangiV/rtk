import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nevigate = useNavigate()
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const HandleChange = (e) => {
        const { name, value } = e.target;

        setUserData((oldVal) => ({
            ...oldVal,
            [name]: value
        }))
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the authentication API
            const response = await axios.post('https://dummyjson.com/auth/login', userData);

            console.log("response", response);

            // Assuming the API response contains a token upon successful login
            const authToken = response.data.token;

            // Securely store the JWT token in local storage
            localStorage.setItem('authToken', authToken);

            localStorage.getItem('userdata', authToken )


            // Redirect the user to the home page or another route
            nevigate('/Product');
        } catch (error) {
            // Handle unsuccessful login attempts
            console.log('Login failed:', error);
            // You can display an error message to the user
        }
    }

    return (
        <>
            <form onSubmit={HandleSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        id="username"
                        name='username'
                        value={userData.username}
                        onChange={HandleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputpassword1" className="form-label">
                        password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        value={userData.password}
                        onChange={HandleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )
}

export default Login
