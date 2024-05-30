import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validate from '../components/signupFormValidation';
import { UserContext } from '../context/UserContext';

const Login = () => {
    // initialising all the hooks
    const navigate = useNavigate();
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const { loginUser } = useContext(UserContext);
    const [loginSuccess, setLoginSuccess] = useState(false);

    // Handle for when form values change
    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    // Handle for when form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // login user function to pass values to routes and controllers
            await loginUser(fields.email, fields.password);
            setLoginSuccess(true);
            // Redirects user back to profile page
            setTimeout(() => {
                navigate('/profile');
            }, 2500);
        // Returns error if unsuccessful
        } catch (error) {
            setFields({ ...fields, password: "" });
            setErrorMessage("Email or password invalid, please try again.");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-4">
                <div className="col-md-4">
                    <div className="card custom-form">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <h1 className="mb-2 fs-4">Login</h1>
                            </div>
                            {/* If login is successful, display success message */}
                            {loginSuccess ? (
                                <p className="text-success mb-3 text-center">
                                    Log in success! You are now logged in & will be redirected to your profile.
                                </p>
                            ) : (
                                // Login form
                                <form onSubmit={handleSubmit} noValidate>

                                    {/* Email Section */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="control-label mb-2">Enter Email:</label>
                                        <input name="email" id="email" className={`form-control ${errors.email && 'is-invalid'}`} value={fields.email} onChange={handleInputChange}/>
                                        {/* error message for invalid email */}
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    {/* Password Section */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="control-label mb-2">Enter Password:</label>
                                        <input type="password" name="password" id="password" className={`form-control ${errors.password && 'is-invalid'}`} value={fields.password} onChange={handleInputChange}/>
                                        {/* error message for invalid password */}
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    {/* error message for invalid email or password */}
                                    {errorMessage && <p className="text-danger mb-3 text-center">{errorMessage}</p>}

                                    {/* Log in button */}
                                    <div className="text-center">
                                        <button type="submit" className="btn custom-button">Log In</button>
                                    </div>
                                    {/* Link to signup page */}
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
