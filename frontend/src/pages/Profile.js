import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupFormValidation from '../components/signupFormValidation';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Profile() {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(UserContext);
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

                <form onSubmit={(e) => {e.preventDefault();}}>

                  {/* Username Section */}
                  <div className="mb-3">

                    <label className="form-label">Username:</label>
                    <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                    name="name" value={formValues.username} onChange={handleChange} disabled={!editMode} />

                    {errors.name && <div className="invalid-feedback">{errors.username}</div>}
                  </div>


                  {/* Email Section */}
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" class={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                    name="email" value={formValues.email} onChange={handleChange} disabled={!editMode} />

                    {errors.email && <div class="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Password Section */}
                  <div className="mb-3">
                    <label class="form-label">Password:</label>
                    <input type="password" class={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                    name="password" value={formValues.password} onChange={handleChange} disabled={!editMode} />

                    {errors.password && <div class="invalid-feedback">{errors.password}</div>}
                  </div>

                  {/* Confirm Password Section */}
                  {editMode ? (
                    <div className="text-center">
                      <button type="button" class="btn btn-success mx-1">
                        Save Changes
                      </button>
                      <button type="button" className="btn btn-secondary mx-1" onClick={() => { setEditMode(false); setFormValues({ ...user, confirmPassword: user.password }); }}> Cancel </button>
                    </div>
            
                  ) : (

                    // Edit Profile Button
                    <div className="text-center">
                      <button type="button" class="btn btn-primary mx-1" onClick={() => setEditMode(true)}>
                        Edit Profile
                      </button>
                      <button type="button" className="btn btn-danger mx-1">
                        Logout
                      </button>
                      <button type="button" className="btn btn-danger mx-1" >Delete Account</button>
                    </div>
                  )}
                </form>
              ) : (
                // Logged out message
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
