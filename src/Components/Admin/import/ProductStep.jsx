import React from 'react'
import { Table, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const ProductStep = ({ columns, dataSource, handleBack}) => {
  return (
    <React.Fragment>
      <Table columns={columns} dataSource={dataSource} />
      <Button icon={<LeftOutlined />} style={{ display: 'flex', alignItems: 'center' }} onClick={handleBack}>
        Back
      </Button>
    </React.Fragment>
  )
}

export default ProductStep