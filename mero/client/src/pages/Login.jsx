import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import axiosInstance from '../configs/axios';

import '../index.css';

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ login: false, error: false, message: '' });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().trim().email('invalid email address').required('required'),
      password: yup
        .string()
        .trim()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          'password must be at least 8 characters and should have at least one number'
        )
        .required('required'),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        const response = await axiosInstance.post('/api/login', { email, password });

        if (response.data.title === 'error') {
          setUser({ login: false, error: true, message: response.data.message });
        } else {
          setUser({ login: true, error: false, message: response.data.message });

          // store access-tkn
          localStorage.setItem('accessTkn', response.data.data.token);
          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  return (
    <>
      <Wrapper>
        {user.error && (
          <div className='alert alert-danger' role='alert'>
            {user.message}
          </div>
        )}

        {user.login && (
          <div className='alert alert-success' role='alert'>
            {user.message}
          </div>
        )}
        <h1 className='text-center'>Log In</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='mt-2'>
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

          <div className='mt-2'>
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

          <div className='text-center'>
            <button type='submit' className='btn btn-primary btn-md mt-3 px-3'>
              Log In
            </button>
          </div>

          <div className='text-center p-3 '>
            <a className='text-dark' href='/signup'>
              Don't have an account? Sign Up
            </a>
          </div>
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 70vh;
  padding: 40px;
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
