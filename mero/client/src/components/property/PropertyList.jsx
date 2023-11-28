import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Alert } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setProperties } from '../../redux/slice/property';

import Loading from '../Loading';
import Navbar from '../Navbar';
import EditProperty from '../modal/EditPropertyModal';
import PropertyCard from './PropertyCard';

import { utils } from '../../utils/fetch';
// console.log(fetchData);
const PropertyList = () => {
  const { properties, edit, del, error, message } = useSelector((state) => state.property);
  const [loading, setLoading] = useState(true);
  const [pageFeatures, setPageFeatures] = useState({ page: 0, limit: 0 });
  const { open } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    utils
      .fetchData(`/api/property?page=${pageFeatures.page}&limit=${pageFeatures.limit}`)
      .then((response) => {
        dispatch(setProperties(response));
        setLoading(false);
      });
  }, [dispatch, loading, pageFeatures]);

  // console.log({ edit, del, error, message });
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Navbar />
        <Wrapper>
          <Container sx={{ py: 8 }} maxWidth='md'>
            {edit && <Alert message={message} type='success' showIcon />}
            {del && <Alert message={message} type='success' showIcon />}
            {error && <Alert message={message} type='error' showIcon />}
            {open ? <EditProperty /> : null}
            <Grid container spacing={4}>
              {properties.length > 0 ? (
                properties.map(({ _id, ...others }) => {
                  return (
                    <Grid item key={_id} xs={12} sm={6} md={4}>
                      <PropertyCard id={_id} {...others} />
                    </Grid>
                  );
                })
              ) : (
                <Typography component='h1' variant='h4'>
                  No property listings...
                </Typography>
              )}
            </Grid>
            <PaginationWrapper>
              <Pagination
                count={10}
                color='primary'
                size='medium'
                onChange={(event) =>
                  setPageFeatures((state) => {
                    return { ...state, page: event.target.innerText };
                  })
                }
              />
            </PaginationWrapper>
          </Container>
        </Wrapper>
      </div>
    );
  }
};

export default PropertyList;

const Wrapper = styled('main')`
  position: relative;
  padding: 3.5rem;
  height: 120vh;
  // overflow: hidden;
  // background-color: lime;
`;

const PaginationWrapper = styled('div')`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
