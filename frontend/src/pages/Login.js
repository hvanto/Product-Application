import { useState, useContext } from 'react';
import useForm from '../hooks/useForm';
import validate from '../components/loginFormValidation';
import { verifyUser } from "../data/repository";
import { useNavigate, Link } from "react-router-dom";
import UsernameContext from '../context/UsernameContext';

const Login = () => {
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { loginUser } = useContext(UsernameContext);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues,
        setErrors,
    } = useForm(login, validate);

    function login() {
        const { email, password } = values;
        console.log("Attempting login with email:", email);
        console.log("Attempting login with password:", password);
        const user = verifyUser(email, password); 
        console.log("Verification result:", user);
        if (user) { 
            console.log("Login successful");
            // Set login state in local storage
            localStorage.setItem('isLoggedIn', true);
            loginUser(values.email);
            localStorage.setItem('currentUser', JSON.stringify(user)); // Store current user data
            setLoginSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } else {
            console.log("Login failed");
            // Clear password field
            setValues({ ...values, password: '' }); 
            setErrors({...errors, auth: "Email and password don't match, please try again."}); // Set authentication error
        }
    }

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
                                <p className="text-success mb-3 text-center">Log in success! You are now logged in & will be redirected to your profile.</p>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3"> 
                                        <label htmlFor="email" className="control-label mb-2">Enter Email:</label> 
                                        <input name="email" id="email" className={`form-control ${errors.email && 'is-invalid'}`}
                                            value={values.email} onChange={handleChange} />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className="mb-3"> 
                                        <label htmlFor="password" className="control-label mb-2">Enter Password:</label> 
                                        <input type="password" name="password" id="password" className={`form-control ${errors.password && 'is-invalid'}`}
                                            value={values.password} onChange={handleChange} />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                    </div>
                                    {errors.auth && (
                                        <p className="text-danger mb-3 text-center">{errors.auth}</p>
                                    )}
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
