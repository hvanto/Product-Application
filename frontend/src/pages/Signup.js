import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useForm from "../hooks/useForm";
import validate from '../components/signupFormValidation';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  // initialising all the hooks
  const navigate = useNavigate();
  const { createUser } = useContext(UserContext);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { values, errors, setErrors, handleChange, handleSubmit } = useForm(submit, validate);

  async function submit() {
    try {
      // Check to see if email already exists in DB
      const response = await axios.get(`http://localhost:4000/api/users`);
      console.log('response', response.data);

      const emailExists = response.data.find(user => user.email === values.email);
      console.log('emailExists', emailExists);

      if (emailExists) {
        // Set an error for the email field.
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Email already exists, please use a unique email address.'
        }));

        // Clear email field
        values.email = '';
        return;
      }

      // If no errors, create user.
      console.log('values', values);
      await createUser({
        username: values.name,
        email: values.email,
        password: values.password
      });
      // Redirects user back to profile page
      setSignupSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2500);
    // Returns error if unsuccessful
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-4">
        <div className="col-md-4 mx-auto">
          <div className="card custom-form">
            <div className="card-body">
              <h1 className="mb-2 fs-4 text-center">Sign Up</h1>
              {/* If signup is successful, display success message */}
              {signupSuccess ? (
                <p className="text-success mb-3 text-center">Sign up success! You are now logged in & will be redirected to your profile.</p>
              ) : (
                // Signup Form
                <form onSubmit={handleSubmit} noValidate>

                  {/* Name field for form */}
                  <div className="mb-3">
                    <label className="form-label">*Name:</label>
                    <input autoComplete="off" className={`form-control ${errors.name && 'is-invalid'}`} type="text" name="name" onChange={handleChange} value={values.name || ''} required />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* Email field for form */}
                  <div className="mb-3">
                    <label className="form-label">*Email Address:</label>
                    <input autoComplete="off" className={`form-control ${errors.email && 'is-invalid'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Password field for form */}
                  <div className="mb-3">
                    <label className="form-label">*Create Password:</label>
                    <input autoComplete="off" className={`form-control ${errors.password && 'is-invalid'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} placeholder="Include uppercase, lowercase, special character & number" required />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Confirm Password field for form */}
                  <div className="mb-3">
                    <label className="form-label">*Confirm Password:</label>
                    <input autoComplete="off" className={`form-control ${errors.confirmPassword && 'is-invalid'}`} type="password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword || ''} placeholder="Confirm password" required />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  {/* Submit button for form */}
                  <div className="text-center"> 
                    <button type="submit" className="btn custom-button">Sign Up</button>
                  </div>

                  {/* Link to login page */}
                  <div className="mt-3 text-center"> 
                    Already have an account? <Link to="/login">Log in!</Link>
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

export default Signup;
