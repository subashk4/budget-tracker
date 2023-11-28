import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Wrapper>
      <div className='spinner-border text-primary lg' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  font-size: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
