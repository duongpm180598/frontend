import React from 'react';
import { Table, Button } from 'antd';
import { LeftOutlined, FileDoneOutlined } from '@ant-design/icons';

const ProductStep = ({ columns, dataSource, handleBack, handleNext, selectedVariantList }) => {
  return (
    <React.Fragment>
      <Table columns={columns} dataSource={dataSource} pagination={{ position: ['bottomCenter'] }} />
      <div className="flex justify-between">
        <Button icon={<LeftOutlined />} style={{ display: 'flex', alignItems: 'center' }} onClick={handleBack}>
          Trở về
        </Button>
        <Button
          icon={<FileDoneOutlined />}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#1677ff',
          }}
          onClick={handleNext}
          type="primary"
          disabled={selectedVariantList.length === 0}
        >
          Chi tiết đơn hàng
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ProductStep;
