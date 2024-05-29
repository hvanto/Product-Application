import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupFormValidation from '../components/signupFormValidation';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Define 'user' here before using it
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

  // const validateForm = () => {
  //   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  //   const validationErrors = signupFormValidation(formValues, storedUsers);

  //   if (formValues.confirmPassword !== formValues.password) {
  //     validationErrors.confirmPassword = 'Passwords do not match';
  //   }

  //   return validationErrors;
  // };

  // const saveChanges = () => {
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  //   const updatedUsers = storedUsers.map((u) => (u.id === currentUser.id ? formValues : u));

  //   setEditSuccess(true);
  //   setErrors({});
  //   setEditMode(false);
  //   setCurrentUser(formValues);
  // };

  // const handleDeleteAccount = () => {
  //   deleteAccount(currentUser, logoutUser);
  //   setAccountDeleted(true);

  //   setTimeout(() => {
  //     navigate('/'); 
  //   }, 3500); 
  // };

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn');
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //   }

  //   if (editSuccess) {
  //     const timeoutId = setTimeout(() => {
  //       setEditSuccess(false);
  //     }, 3000); 

  //     return () => clearTimeout(timeoutId); 
  //   }
  // }, [navigate, editSuccess]); 

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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.username}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div class="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label class="form-label">Password:</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.password && <div class="invalid-feedback">{errors.password}</div>}
                  </div>
                  {editMode ? (
                    <div className="text-center">
                      <button type="button" class="btn btn-success mx-1">
                        Save Changes
                      </button>
                      <button type="button" className="btn btn-secondary mx-1" onClick={() => {
                        setEditMode(false);
                        setFormValues({ ...user, confirmPassword: user.password }); 
                      }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <button type="button" class="btn btn-primary mx-1" onClick={() => setEditMode(true)}>
                        Edit Profile
                      </button>
                      <button type="button" className="btn btn-danger mx-1">
                        Logout
                      </button>
                      <button
                      type="button"
                      className="btn btn-danger mx-1"
                      >
                      Delete Account
                    </button>
                    </div>
                  )}
                </form>
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
