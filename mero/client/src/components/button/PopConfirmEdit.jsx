import { Popconfirm, message } from 'antd';
import styled from 'styled-components';
const PopConfirm = ({ id }) => {
  async function confirm(e) {}

  function cancel(e) {
    message.error('Click on No');
  }

  return (
    <Wrapper>
      <Popconfirm
        title='Are you sure to edit this task?'
        onConfirm={confirm}
        onCancel={cancel}
        okText='Yes'
        cancelText='No'
      >
        Edit
      </Popconfirm>
    </Wrapper>
  );
};

export default PopConfirm;

const Wrapper = styled.div`
  z-index: 1000;
`;
