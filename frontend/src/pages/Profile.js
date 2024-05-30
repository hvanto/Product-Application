import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupFormValidation from '../components/signupFormValidation';
import axios from 'axios';
import { UserContext } from '../context/UserContext';


function Profile() {
  const navigate = useNavigate();
  const { user, logoutUser, updateUser, deleteUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(user ? { ...user, confirmPassword: user.password } : {});
  const [editSuccess, setEditSuccess] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValues({ ...user, confirmPassword: user.password });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleSaveChanges = async () => {
    if (validateForm(formValues)) {
      try {
        await updateUser(user.userId, formValues);
        // setEditSuccess(true);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.userId);
      setAccountDeleted(true);
      setTimeout(() => {
        logoutUser();
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  // Form Validation
  const validateForm = (formValues) => { 
    let errors = {};
    let isValid = true;

    // Check email in correct format
    if (!formValues.email) {
      errors.email = 'Email is required';
      isValid = false;
    }

    // Check email has @ and .
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

    // Check password is at least 8 characters
    if (formValues.password && formValues.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
      isValid = false;
    }

    // Check password has special characters
    if (formValues.password && !/(?=.*[!@#$%^&*])/.test(formValues.password)) {
      errors.password = 'Password must contain a special character';
      isValid = false;
    }

    // Check password has uppercase letter
    if (formValues.password && !/(?=.*[A-Z])/.test(formValues.password)) {
      errors.password = 'Password must contain an uppercase letter';
      isValid = false;
    }

    // Check password has number
    if (formValues.password && !/(?=.*[0-9])/.test(formValues.password)) {
      errors.password = 'Password must contain a number';
      isValid = false;
    }

    // 
    setErrors(errors);

    // If no issues, return true
    return isValid;
  }



  return (
    <div className="container-fluid">
      {editSuccess && (
        <div className="alert alert-success text-center mt-4 col-md-6 mx-auto" role="alert">
          Your profile details have been updated successfully!
        </div>
      )}
      {accountDeleted && (
        <div className="alert alert-danger text-center mt-4 col-md-6 mx-auto" role="alert">
          Account deleted. You will be redirected to the home page.
        </div>
      )}
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-2 fs-4 text-center">Your Profile</h1>
              {user ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  {/* Username Section */}
                  <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
                    name="username" value={formValues.username} onChange={handleChange} disabled={!editMode} />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>

                  {/* Email Section */}
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                    name="email" value={formValues.email} onChange={handleChange} disabled={!editMode} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Password Section */}
                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                    name="password" value={formValues.password} onChange={handleChange} disabled={!editMode} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  {/* If in edit mode, display save changes or cancel buttons */}
                  {editMode ? (
                    <div className="text-center">
                      <button type="button" className="btn btn-success mx-1" onClick={handleSaveChanges}>
                        Save Changes
                      </button>
                      <button type="button" className="btn btn-secondary mx-1" onClick={() => { setEditMode(false); setFormValues({ ...user, confirmPassword: user.password }); }}>Cancel</button>
                    </div>
                  ) : (
                    // If not in edit mode, display edit profile, logout, and delete account buttons
                    <div className="text-center">
                      <button type="button" className="btn btn-primary mx-1" onClick={() => setEditMode(true)}>
                        Edit Profile
                      </button>
                      <button type="button" className="btn btn-danger mx-1" onClick={handleLogout}>
                        Logout
                      </button>
                      <button type="button" className="btn btn-danger mx-1" onClick={handleDeleteAccount}>
                        Delete Account
                      </button>
                    </div>
                  )}
                </form>
                // If user is not logged in, display message to log in
              ) : (
                <p className="text-center">
                  Please <Link to="/login">log in</Link> to view your profile.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}



export default Profile;
