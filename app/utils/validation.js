import validator from "is_js";

const checkEmpty = (value, key) => {
    if (validator.empty(value.trim())) {
        return `${key}`;
    } else {
        return '';
    }
}

const checkMinLength = (value, minlength, key) => {
    if (value.trim().length < minlength) {
        return `${key}`;
    }
    else {
        return '';
    }
}

export default function (data) {
    const { email, password, confirmPassword } = data;

    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, 'Please enter your email !');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!validator.email(email)) {
                return "Please enter valid email !";
            }
        }
    }

    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, 'Please enter your password !');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let checkLength = checkMinLength(password, 8, "Password must be at least 8 characters !");
            if (checkLength !== '') {
                return checkLength;
            }
        }
    }

    if (confirmPassword !== undefined) {
        if (password !== confirmPassword) {
            return "Confirm password is incorrect !";
        }
        else {
            return '';
        }
    }
}