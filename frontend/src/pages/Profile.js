import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupFormValidation from '../components/signupFormValidation';
import { logoutUser, deleteAccount } from '../data/repository';

function Profile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({ ...currentUser, confirmPassword: currentUser.password });
  const [editSuccess, setEditSuccess] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const validationErrors = signupFormValidation(formValues, storedUsers);

    if (formValues.confirmPassword !== formValues.password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    return validationErrors;
  };

  const saveChanges = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map((u) => (u.id === currentUser.id ? formValues : u));

    localStorage.setItem('currentUser', JSON.stringify(formValues));
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setEditSuccess(true);
    setErrors({});
    setEditMode(false);
    setCurrentUser(formValues);
  };

  const handleDeleteAccount = () => {
    deleteAccount(currentUser, logoutUser);
    setAccountDeleted(true);

    setTimeout(() => {
      navigate('/'); 
    }, 3500); 
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }

    if (editSuccess) {
      const timeoutId = setTimeout(() => {
        setEditSuccess(false);
      }, 3000); 

      return () => clearTimeout(timeoutId); 
    }
  }, [navigate, editSuccess]); 

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
              {currentUser ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveChanges();
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      class={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.email && <div class="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label class="form-label">Password:</label>
                    <input
                      type="password"
                      class={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    {errors.password && <div class="invalid-feedback">{errors.password}</div>}
                  </div>
                  {editMode ? (
                    <div className="text-center">
                      <button type="button" class="btn btn-success mx-1" onClick={saveChanges}>
                        Save Changes
                      </button>
                      <button type="button" className="btn btn-secondary mx-1" onClick={() => {
                        setEditMode(false);
                        setFormValues({ ...currentUser, confirmPassword: currentUser.password }); 
                      }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <button type="button" class="btn btn-primary mx-1" onClick={() => setEditMode(true)}>
                        Edit Profile
                      </button>
                      <button type="button" className="btn btn-danger mx-1" onClick={() => { logoutUser(); navigate('/login'); }}>
                        Logout
                      </button>
                      <button
                      type="button"
                      className="btn btn-danger mx-1"
                      onClick={() => { handleDeleteAccount(); }}
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
