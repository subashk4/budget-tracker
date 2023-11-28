import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import signupSchema from '../schemas/signupSchema';

import axiosInstance from '../configs/axios';

import '../index.css';

export default function Signup() {
  const [user, setUser] = useState({ signup: false, error: false, message: '' });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNumber: '',
      displayAddress: '',
      userType: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axiosInstance.post('/api/signup', { ...values });
        if (response.data.title === 'error') {
          setUser({ error: true, message: response.data.message });
        }

        if (response.data.title === 'validation error') {
          setUser({ error: true, message: response.data.message });
        }

        if (response.data.title === 'signup') {
          setUser({ error: false, signup: true, message: response.data.message });
          navigate('/login');
        }
        console.log(response);
      } catch (error) {
        setUser({ error: true, message: error.response.message });
      }
    },
  });
  return (
    <>
      <Wrapper>
        {user.error && (
          <div className='alert alert-danger' role='alert'>
            {user.message.includes('duplicate') ? `The email already exists.` : user.message}
          </div>
        )}
        {user.login && (
          <div className='alert alert-success' role='alert'>
            {user.message}
          </div>
        )}
        <h1 className='text-center'>Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              className='form-control'
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className='error'>{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              className='form-control'
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className='error'>{formik.errors.lastName}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              className='form-control'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='form-control'
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='error'>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='displayAddress'>Display Address</label>
            <input
              type='text'
              id='displayAddress'
              className='form-control'
              {...formik.getFieldProps('displayAddress')}
            />
            {formik.touched.displayAddress && formik.errors.displayAddress ? (
              <div className='error'>{formik.errors.displayAddress}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='contactNumber'>Contact Number</label>
            <input
              type='string'
              id='contactNumber'
              className='form-control'
              {...formik.getFieldProps('contactNumber')}
            />
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <div className='error'>{formik.errors.contactNumber}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='userType'>User Type</label>
            <select
              id='userType'
              className='form-select'
              name='userType'
              value={formik.values.userType}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
            >
              <option value='admin'>Admin</option>
              <option value='buyer'>Buyer</option>
              <option value='seller'>Seller</option>
            </select>
            {formik.touched.userType && formik.errors.userType ? (
              <div className='error'>{formik.errors.userType}</div>
            ) : null}
          </div>

          <div className='text-center p-3'>
            <button type='submit' className='btn btn-success btn-md form-group px-4'>
              Sign Up
            </button>
          </div>
        </form>

        <div className='text-center p-3 '>
          <a className='text-dark' href='/login'>
            Already have an account? Sign In
          </a>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40vw;
  padding: 3rem;
  transform: translate(-50%, -50%);
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  label {
    display: inline-block;
    margin-bottom: 2.5px;
  }

  .error {
    color: #dc3545;
    padding: 1px 2px;
  }
`;
