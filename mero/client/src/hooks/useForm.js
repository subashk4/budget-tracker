import { useState } from 'react';
import validator from 'validator';
import axios from 'axios';

const useForm = (props) => {
  const { usr, err, status: statusInit } = { ...props };

  const [user, setUser] = useState(usr);
  const [error, setError] = useState(err);
  const [status, setStatus] = useState(statusInit);

  // useEffect(() => {}, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event, endpoint) => {
    event.preventDefault();

    const { firstname, lastname, email, password, displayAddress, contactNumber, userType } = user;
    const error = {
      firstname: !validator.isAlpha(firstname),
      lastname: !validator.isAlpha(lastname),
      email: !validator.isEmail(email),
      password: !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 0,
        minSymbols: 0,
        minNumbers: 0,
        returnScore: false,
      }),
      displayAddress: !validator.isAlphanumeric(displayAddress),
      contactNumber: !validator.isNumeric(contactNumber),
      userType: !validator.isAlpha(userType),
    };
    setError(error);

    //? form is validated
    const isHit = Object.values(error).every((err) => err === false);

    if (isHit) {
      try {
        const { data, status } = await axios.post(endpoint, user);
        if (status === 201) {
          setStatus({ state: true, title: 'success', message: 'user signup successful' });
        } else {
          setStatus({ state: false, title: 'error', message: data.message });
        }
      } catch (error) {
        console.log('catch block' + error);
      }
    }
  };
  return {
    user,
    setUser,
    error,
    setError,
    status,
    setStatus,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
