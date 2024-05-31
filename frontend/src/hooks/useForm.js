import { useState, useEffect } from 'react';

// Custom hook for form validation
const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  // initialising all the hooks
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect to check for errors
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  // Handle for when form is submitted
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  // Handle for when form values change
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // return for all the hooks
  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
    setErrors,
    errorMessage, 
    setErrorMessage, 
  };
};

export default useForm;
