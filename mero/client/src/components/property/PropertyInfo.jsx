import * as React from 'react';
import { CssBaseline, Box, Container, Typography } from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

export default function PropertyInfo({
  propertyName,
  propertyType,
  valuation,
  location,
  description,
  isSold,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='sm'>
        <Box component='div' sx={{ p: '1rem', mb: '1.5rem' }}>
          <img
            src='https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='home'
            className='img-fluid'
          />
        </Box>
        <CustomTypography variant='h5' component='h1' gutterBottom>
          {propertyName}
        </CustomTypography>
        <CustomTypography variant='body1' component='h2' color='text.primary' gutterBottom>
          Description
          <br />
          {description}
        </CustomTypography>
        <Meta>
          <CustomTypography variant='body1'>
            <LocationOnIcon />
            {location.address}
          </CustomTypography>
          <CustomTypography variant='body1'>
            <AttachMoneyIcon />
            {valuation}
          </CustomTypography>
          <CustomTypography
            variant='body1'
            className={`badge ${isSold ? 'bg-danger' : 'bg-success text-white'}`}
            sx={{
              transition: '1s ease-in-out',
              ':hover': {
                transform: 'rotate(10deg) translate(2px, 5px) rotate(-8deg) scale(1.25)',
                cursor: 'pointer',
              },
            }}
          >
            {isSold ? 'Sold Out' : 'Avaliable'}
          </CustomTypography>
        </Meta>
        <CustomTypography
          variant='body1'
          className={`badge ${propertyType === 'sale' ? 'bg-success' : 'bg-warning text-dark'}`}
        >
          <HomeIcon sx={{ p: '1px', mr: '3px' }} />
          {propertyType}
        </CustomTypography>
      </Container>
    </Box>
  );
}

const Meta = styled('div')`
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  gap: 3rem;
`;

const CustomTypography = styled(Typography)`
  text-transform: capitalize;
  margin: 2px;
`;
