export default function validate(values) {
    let errors = {};

    // Validate email
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    // Validate password
    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
}
