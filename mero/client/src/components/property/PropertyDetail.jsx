import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import UserCard from '../user/UserCard';
import Loading from '../Loading';
import PropertyInfo from './PropertyInfo';

import { utils } from '../../utils/fetch';
const PropertyDetail = () => {
  const [property, setProperty] = useState({});
  // const [ownerDetails, setOwnerDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    console.log('use effect');
    utils.fetchData(`/api/property/${id}`).then((property) => {
      setProperty(property[0]);
      setLoading(false);
    });
  }, []);

  console.log(property);

  return (
    <Wrapper>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item md={12} lg={8}>
              <Grid container gap={2}>
                <Grid item>
                  <PropertyInfo {...property} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} lg={4} sx={{ marginTop: '10rem' }}>
              <UserCard {...property.owner_details[0]} />
              <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '2rem' }}
              >
                <Button
                  variant='contained'
                  color='success'
                  size='large'
                  onClick={() => alert('property booked?')}
                >
                  Book now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Wrapper>
  );
};

export default PropertyDetail;

const Wrapper = styled('main')`
  margin-top: 4rem;
  // background-color: lime;
  height: 90vh;
`;
