import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setProperties } from '../redux/slice/property';
import { Alert } from 'antd';

import PropertyCard from './property/PropertyCard';
import Loading from './Loading';
import { utils } from '../utils/fetch';
import EditPropertyModal from '../components/modal/EditPropertyModal';
export default function Hero() {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.user);
  const { properties, edit, del, error, message } = useSelector((state) => state.property);
  const { open } = useSelector((state) => state.modal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    utils
      .fetchData(`/api/trending`)
      .then((response) => dispatch(setProperties(response.splice(0, 3))));
    console.log(properties);
    setLoading(false);
  }, [loading]);
  return (
    <Wrapper>
      <Box component='div' maxWidth='sm' sx={{ margin: '0 auto' }}>
        {open ? <EditPropertyModal /> : null}
        {edit && <Alert message={message} type='success' showIcon />}
        {del && <Alert message={message} type='success' showIcon />}
        {error && <Alert message={message} type='error' showIcon />}
        <Typography
          component='h1'
          variant='h4'
          align='center'
          color='text.secondary'
          gutterBottom
          sx={{ textTransform: 'capitalize' }}
        >
          Greetings <br /> {`${firstName} ${lastName}`}
        </Typography>
        <Typography component='p' variant='body' align='center' gutterBottom>
          Welcome to the marketplace. You get the best deals here. <br /> Bringing you closer to
          yours truly dream home
        </Typography>
      </Box>
      <Container sx={{ p: 6, mt: 4 }} maxWidth='md'>
        <Typography component='h4' variant='h6' align='left'>
          Trending Properties
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={6} size='sm'>
            {properties.map(({ _id, ...others }) => {
              return (
                <Grid item key={_id} xs={12} sm={6} md={4}>
                  <PropertyCard id={_id} {...others} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled('section')`
  height: 100vh;
  width: 100vw;
  text-align: center;
  padding: 8rem 3rem;
  margin-bottom: 3rem;
`;
