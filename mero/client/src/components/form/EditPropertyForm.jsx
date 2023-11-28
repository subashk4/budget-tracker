import React, { useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { handleClose } from '../../redux/slice/modal';
import { setProperties, setEditFlag } from '../../redux/slice/property';

import propertySchema from '../../schemas/propertySchema';

import { utils } from '../../utils/fetch';

export default function EditPropertyForm() {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);
  const { id } = useSelector((state) => state.modal);

  // console.log(properties, id);

  const property = properties.find((property) => property._id === id);
  // console.log(property);
  // const [status, setStatus] = useState({ done: false, error: false, message: '' });
  // const clearFlag = (payload) => {
  //   setTimeout(() => {
  //     dispatch(setDeleteFlag({ ...payload }));
  //   }, 2000);

  const clearFlag = function (payload) {
    setTimeout(() => {
      dispatch(setEditFlag({ ...payload }));
    }, 2000);
  };
  const formik = useFormik({
    initialValues: {
      ...property,
      address: property.location.address,
    },
    validationSchema: propertySchema,
    onSubmit: async (values) => {
      const { booked_users, created_at, location, owner, __v, _id, ...others } = values;

      try {
        const response = await utils.updateData(`/api/property/${values._id}`, { ...others });
        console.log(response);
        if (response.title === 'error') {
          dispatch(setEditFlag({ error: true, message: response.message }));
          clearFlag({ error: false, message: '' });
          dispatch(handleClose());
        }
        if (response.title === 'validation error') {
          dispatch(setEditFlag({ error: true, message: response.message }));
          clearFlag({ error: false, message: '' });
          dispatch(handleClose());
        }

        if (response.message.includes('update property failed')) {
          dispatch(setEditFlag({ error: true, message: response.message }));
          clearFlag({ error: false, message: '' });
          dispatch(handleClose());
        }

        if (response.title === 'update property') {
          // console.log('here');
          const { data } = response;
          const propertyIndex = properties.findIndex((property) => property._id === data._id);
          const updatedProperties = [...properties];
          updatedProperties[propertyIndex] = { ...data };

          dispatch(setEditFlag({ edit: true, message: response.message }));
          clearFlag({ error: false, message: '' });
          dispatch(handleClose());
          dispatch(setProperties(updatedProperties));
        }
      } catch (error) {
        const { data } = error.response;
        dispatch(setEditFlag({ error: true, done: true, message: data.message }));
        clearFlag({ error: false, message: '' });
        dispatch(handleClose());
      }
    },
  });
  return (
    <>
      <Wrapper>
        {/* {status.error && (
          <div className='alert alert-danger' role='alert'>
            {status.message}
          </div>
        )} */}
        <h1 className='text-center'>Edit Property</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='propertyName'>Property Name</label>
            <input
              type='text'
              id='propertyName'
              className='form-control'
              {...formik.getFieldProps('propertyName')}
            />
            {formik.touched.propertyName && formik.errors.propertyName ? (
              <div className='error'>{formik.errors.propertyName}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              className='form-control'
              {...formik.getFieldProps('address')}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className='error'>{formik.errors.address}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='valuation'>Valuation</label>
            <input
              type='number'
              id='valuation'
              className='form-control'
              {...formik.getFieldProps('valuation')}
            />
            {formik.touched.valuation && formik.errors.valuation ? (
              <div className='error'>{formik.errors.valuation}</div>
            ) : null}
          </div>

          <div className='row'>
            <div className='col'>
              <label htmlFor='propertyType'>Property Type</label>
              <select
                id='propertyType'
                className='form-select'
                name='propertyType'
                value={formik.values.propertyType}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
              >
                <option value='sale'>Sale</option>
                <option value='rent'>Rent</option>
              </select>
              {formik.touched.propertyType && formik.errors.propertyType ? (
                <div className='error'>{formik.errors.propertyType}</div>
              ) : null}
            </div>

            <div className='col'>
              <label htmlFor='isSold'> Sold</label>
              <select
                id='isSold'
                className='form-select'
                name='isSold'
                value={formik.values.isSold}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
              >
                <option value='true'>True</option>
                <option value='false'>False</option>
              </select>
              {formik.touched.isSold && formik.errors.isSold ? (
                <div className='error'>{formik.errors.isSold}</div>
              ) : null}
            </div>
          </div>

          <div className='form-group mt-3'>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className='error'>{formik.errors.description}</div>
            ) : null}
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary btn-md  mt-2'>
              Edit Property
            </button>
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
