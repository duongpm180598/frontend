import React from 'react';
import { Table } from 'antd';

const SupplierStep = ({columns, dataSource}) => {
  return <Table columns={columns} dataSource={dataSource} />;
};

export default SupplierStep;
