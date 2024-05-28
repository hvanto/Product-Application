export default function validate(values) {
    let errors = {};
  
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check for name validity
    if (!values.name) {
      errors.name = 'Name is required';
    } else if (values.name.length < 3) {
      errors.name = 'Name must be 3 or more characters';
    } else if (!/^[a-zA-Z\s]*$/.test(values.name)) {
      errors.name = 'Name must contain only letters and spaces';
    }
  
    // Check for email validity
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    // Check for duplicate email
    const isEmailDuplicate = storedUsers.some(
      (user) => user.email === values.email && user.id !== values.id // Exclude the current user if editing
    );
  
    if (isEmailDuplicate) {
      errors.email = 'Email address is already in use';
    }
  
    // Check for password validity
    if (values.password && values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    } else if (values.password && !/(?=.*[0-9])/.test(values.password)) {
      errors.password = 'Password must contain a number';
    } else if (values.password && !/(?=.*[A-Z])/.test(values.password)) {
      errors.password = 'Password must contain an uppercase letter';
    } else if (values.password && !/(?=.*[!@#$%^&*])/.test(values.password)) {
      errors.password = 'Password must contain a special character';
    }
  
    if (values.confirmPassword && values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  }
  