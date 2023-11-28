import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle } from '@mui/material';

import { useSelector } from 'react-redux';

const CustomAlert = ({ severity, title, message }) => {
  const { id } = useSelector((state) => state.modal);
  console.log(id);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => setVisible(false), 2000);
  }, [id]);

  return <Wrapper>{visible && <Alert severity={severity}>{message}</Alert>}</Wrapper>;
};

export default CustomAlert;

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: 10rem;
  left: 0;
  // right: 12%;
  // transform: translate(-50%, 0);k
`;
