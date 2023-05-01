import { Button, Input, List, Modal } from 'antd/es';
import React from 'react';
import { useSelector } from 'react-redux';
import { getProductVariant } from '../../../redux/selector';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '@mui/material';

const BillModal = ({ isModalOpen, handleOk, handleCancel, selectedRowKeys, selectedProduct, selectedSupplier }) => {
  const productVariant = useSelector(getProductVariant);
  const [currentProductVariant, setCurrentProductVariant] = useState([]);

  const handleChangeQuantity = (e, id) => {
    const index = currentProductVariant.findIndex((item) => item.id === id);
    if (e.target.value <= 0 || e.target.value > currentProductVariant[index].inventory) return;
    const newProductVariant = [...currentProductVariant];
    newProductVariant[index] = { ...newProductVariant[index], quantity: e.target.value };
    setCurrentProductVariant(newProductVariant);
  };

  const setInitProductVariants = () => {
    return [...productVariant]
      .filter((item) => selectedRowKeys.includes(item.id))
      .map((item) => {
        return {
          ...item,
          quantity: 1,
        };
      });
  };

  const getTotalPrice = () => {
    let total = 0;
    currentProductVariant.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    setCurrentProductVariant(setInitProductVariants());
  }, [isModalOpen]);

  return (
    <Modal
      title="Chi tiết hóa đơn"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Trở về
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} style={{ backgroundColor: '#1677ff' }}>
          Xác nhận
        </Button>,
      ]}
      width={700}
    >
      <h3>
        <b>Nhà cung cấp: </b>
        {selectedSupplier.name}
      </h3>
      <h3>
        <b>Sản phẩm: </b>
        {selectedProduct.name}
      </h3>
      <h3>
        <b>Danh sách sản phẩm: </b>
      </h3>
      <Card className="mt-3">
        <List
          itemLayout="horizontal"
          dataSource={currentProductVariant}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={`Size: ${item.variant_attributes[0].value}, Màu: ${item.variant_attributes[1].value}`}
              />
              <b className="mr-4">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(item.price)}
              </b>
              <span className="mr-4">x</span>
              <Input
                type="number"
                style={{ width: 90 }}
                value={item.quantity}
                onChange={(e) => handleChangeQuantity(e, item.id)}
              />
            </List.Item>
          )}
        />
      </Card>
      <div className="flex justify-between mt-3">
        <h3>Tổng hóa đơn:</h3>
        <b>
          =
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(getTotalPrice())}
        </b>
      </div>
    </Modal>
  );
};

export default BillModal;
