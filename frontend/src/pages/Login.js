import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validate from '../components/signupFormValidation'; // Import validate function
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { verifyUser } from '../data/repository';

const Login = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const { loginUser } = useContext(UserContext);
    const [loginSuccess, setLoginSuccess] = useState(false);


    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const user = await verifyUser(fields.email, fields.password);
        console.log(user);
    
        if(user === null) {
          // Login failed, reset password field to blank and set error message.
          setFields({ ...fields, password: "" });
          setErrorMessage("Email or password invalid, please try again.");
          return;
        }
    
        // Set user state.
        await loginUser(user);
        console.log('loginUser called');
    
        // Navigate to the profile page.
        // setTimeout(() => {
        //     navigate('/profile');
        // }, 3000);
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const validationErrors = validate(fields); // Use validate function to get errors
    //     setErrors(validationErrors);

    //     if (Object.keys(validationErrors).length === 0) {
    //         try {
    //             const response = await axios.post('http://localhost:4000/api/user', fields);
    //             loginUser(response.data.email);
    //             setLoginSuccess(true);
    //             setTimeout(() => {
    //                 navigate('/profile');
    //             }, 3000);
    //         } catch (error) {
    //             setFields({ ...fields, password: "" });
    //             setErrorMessage("Email and/or password invalid, please try again.");
    //             console.error('Error logging in:', error);
    //         }
    //     }
    // };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-4">
                <div className="col-md-4">
                    <div className="card custom-form">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <h1 className="mb-2 fs-4">Login</h1>
                            </div>
                            {/* // If login is successful, display success message, otherwise display login form */}
                            {loginSuccess ? (<p className="text-success mb-3 text-center">Log in success! You are now logged in & will be redirected to your profile.</p>) : (
                                <form onSubmit={handleSubmit} noValidate>

                                    {/* Email section for form */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="control-label mb-2">Enter Email:</label>
                                        <input name="email" id="email" className={`form-control ${errors.email && 'is-invalid'}`}
                                            value={fields.email} onChange={handleInputChange} />
                                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                    </div>

                                    {/* Password section for form */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="control-label mb-2">Enter Password:</label>
                                        <input type="password" name="password" id="password" className={`form-control ${errors.password && 'is-invalid'}`} value={fields.password} onChange={handleInputChange} />
                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                    </div>

                                    {/* Error message section */}
                                    {errorMessage && (<p className="text-danger mb-3 text-center">{errorMessage}</p>)} {}

                                    {/* Submit button */}
                                    <div className="text-center">
                                        <button type="submit" className="btn custom-button">Log In</button>
                                    </div>

                                    {/* Sign up link */}
                                    <div className="mt-3 text-center">
                                        Don't have an account? <Link to="/signup">Sign up!</Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
