import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const { loginUser, loggedIn } = useContext(UserContext);
    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            navigate('/profile');
        }
    }, [loggedIn, navigate]);

    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUser(fields.email, fields.password);
            setLoginSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 2500);
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
                            {loginSuccess ? (
                                <p className="text-success mb-3 text-center">
                                    Log in success! You are now logged in & will be redirected to your profile.
                                </p>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="control-label mb-2">Enter Email:</label>
                                        <input name="email" id="email" className={`form-control ${errors.email && 'is-invalid'}`} value={fields.email} onChange={handleInputChange} />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="control-label mb-2">Enter Password:</label>
                                        <input type="password" name="password" id="password" className={`form-control ${errors.password && 'is-invalid'}`} value={fields.password} onChange={handleInputChange} />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    {errorMessage && <p className="text-danger mb-3 text-center">{errorMessage}</p>}
                                    <div className="text-center">
                                        <button type="submit" className="btn custom-button">Log In</button>
                                    </div>
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
