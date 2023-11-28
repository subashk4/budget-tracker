import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Footer = () => {
  return (
    <Wrapper>
      <Typography component='p' variant='subtitle1' gutterBottom color='text.primary'>
        Built My Portfolio Site. Copyright 2022 © Rejan Bajracharya.This project is for the
        educational purpose and its content are solely for the educational purpose. Can be served as
        a resource, but the claims to the project is strictly prohibited
      </Typography>
    </Wrapper>
  );
};
export default Footer;

const Wrapper = styled('footer')`
  height: 8rem;
  width: 65vw;
  margin-top: 20rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: lime;
  padding: 1rem 1.25rem;
  border: 1px solid #fff;
  border-radius: 1px;
  // background-color: yellow;
  // overflow: hidden;
`;
