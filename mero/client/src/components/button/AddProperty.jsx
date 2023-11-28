import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const AddProperty = ({ label, to: url, hide }) => {
  const navigate = useNavigate();
  return (
    <CustomButton
      variant='outlined'
      sx={{ display: `${hide && 'none'}` }}
      onClick={() => {
        navigate('/property/addProperty');
      }}
    >
      {label}
    </CustomButton>
  );
};

export default AddProperty;

const CustomButton = styled(Button)`
  background-color: #fff;
  color: text.primary;

  :hover {
    background: #fff;
    color: text.primary;
  }
`;
