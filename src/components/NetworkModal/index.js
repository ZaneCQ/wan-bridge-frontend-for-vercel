import { Modal } from 'antd';

const NetworkModal = () => {
  return (
    <Modal
      title="Basic Modal"
      visible={assetModalVisible}
      onOk={props.onOk}
      onCancel={props.onCancel}
    ></Modal>
  );
};

export default NetworkModal;
