import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, CardActions, Typography, Button, Link } from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { handleOpen } from '../../redux/slice/modal';
import PopConfirm from '../button/PopConfirmDelete';

const PropertyCard = ({
  id,
  propertyName,
  description,
  propertyType,
  location,
  valuation,
  owner,
  isSold,
}) => {
  const { id: userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <CustomLink href={`/property/${id}`}>
          <Typography
            gutterBottom
            variant='h5'
            component='h2'
            sx={{
              textTransform: 'capitalize',
              color: 'text.primary',
              ':hover': {
                color: '#1976d2',
              },
            }}
          >
            {propertyName}
          </Typography>
        </CustomLink>
        <Typography>{description}</Typography>
        <Meta>
          <Typography
            component='h6'
            variant='h7'
            className={`badge ${propertyType === 'sale' ? 'bg-success' : 'bg-warning text-dark'}`}
          >
            {propertyType}
          </Typography>
          <Typography component='h6' variant='h7'>
            <LocationOnIcon size='sm' />
            {location.address}
          </Typography>
        </Meta>
        <Meta>
          <Typography component='h6' variant='h7'>
            $ {valuation}
          </Typography>
          <Typography
            component='h6'
            variant='h7'
            className={`badge badge-pill ${isSold ? 'bg-danger' : 'bg-success text-white'}`}
            sx={{
              transition: '1s ease-in-out',
              fontSize: '1rem',
              ':hover': {
                transform: 'rotate(10deg) translate(2px, 5px) rotate(-8deg)',
                cursor: 'pointer',
              },
            }}
          >
            {isSold ? 'Sold' : 'Available'}
          </Typography>
        </Meta>
      </CardContent>
      <CardActions sx={{ display: `${userId !== owner && 'none'}` }}>
        <Button
          variant='text'
          onClick={() => dispatch(handleOpen({ id }))}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button variant='text' color='error' startIcon={<DeleteIcon />}>
          <PopConfirm id={id} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;

const Meta = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  padding: 1rem 0;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: #000;

  Typography {
    color: 'blue';
  }
`;
