import { setProperties, setDeleteFlag } from '../../redux/slice/property';
import { useSelector, useDispatch } from 'react-redux';
import { utils } from '../../utils/fetch';
import { Popconfirm, message } from 'antd';

const PopConfirm = ({ id }) => {
  const { properties } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  async function confirm(e) {
    const clearFlag = (payload) => {
      setTimeout(() => {
        dispatch(setDeleteFlag({ ...payload }));
      }, 2000);
    };
    try {
      const response = await utils.deleteData(`/api/property/${id}`);

      if (response.data) {
        const updatedProperties = properties.filter((property) => property._id !== id);
        dispatch(setDeleteFlag({ del: true, message: response.data.message }));
        dispatch(setProperties(updatedProperties));
        clearFlag({ del: false, message: '' });
      }
      message.success('property deleted successfully');
    } catch ({ response: { data } }) {
      dispatch(setDeleteFlag({ error: true, message: data.message }));
      clearFlag({ error: false, message: '' });
      // console.log(data);
    }
  }

  function cancel(e) {
    // console.log(e);
    // message.error('Click on No');
  }

  return (
    <Popconfirm
      title='Are you sure to delete this task?'
      onConfirm={confirm}
      onCancel={cancel}
      okText='Yes'
      cancelText='No'
    >
      Delete
    </Popconfirm>
  );
};

export default PopConfirm;
