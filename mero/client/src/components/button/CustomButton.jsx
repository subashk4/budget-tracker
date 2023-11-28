import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const CustomButton = ({ label, to: url, hide }) => {
  const navigate = useNavigate();
  return (
    <CustomBtn
      variant='outlined'
      sx={{ display: `${hide && 'none'}` }}
      onClick={() => {
        alert('test btn');
      }}
    >
      {label}
    </CustomBtn>
  );
};

export default CustomButton;

const CustomBtn = styled(Button)`
  background-color: #fff;
  color: text.primary;

  :hover {
    background: #fff;
    color: text.primary;
  }
`;
