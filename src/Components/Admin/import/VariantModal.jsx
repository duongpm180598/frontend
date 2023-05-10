import { Card } from 'antd';
import { Button, Input, List, Modal } from 'antd/es';
import React, { useEffect, useState } from 'react';
import './style.css';

const VariantModal = ({
  isOpen,
  toggleModal,
  productVariant,
  selectedVariantList,
  handleChangeSelectedVariantList,
}) => {
  const [currentProductVariant, setCurrentProductVariant] = useState([]);
  useEffect(() => {
    setCurrentProductVariant(
      productVariant.map((item) => {
        const existVariant = selectedVariantList.find((variant) => variant.id === item.id);
        return {
          ...item,
          quantity: !!existVariant ? existVariant.quantity : 0,
        };
      })
    );
    return () => {
      setCurrentProductVariant([]);
    };
  }, [productVariant, selectedVariantList]);

  const handleCancel = () => {
    toggleModal(false);
  };

  const handleOk = () => {
    let newSelectedVariantList = [...selectedVariantList];
    currentProductVariant.forEach((variant) => {
      const selectedVariantIndex = newSelectedVariantList.findIndex((item) => item.id === variant.id);
      if (selectedVariantIndex > -1) {
        if (variant.quantity === 0) {
          newSelectedVariantList.splice(selectedVariantIndex, 1);
        } else {
          newSelectedVariantList[selectedVariantIndex] = {
            ...newSelectedVariantList[selectedVariantIndex],
            quantity: variant.quantity,
          };
        }
      } else {
        if (variant.quantity === 0) {
          return;
        } else {
          newSelectedVariantList = [...newSelectedVariantList, variant];
        }
      }
    });
    handleChangeSelectedVariantList(newSelectedVariantList);
    toggleModal(false);
  };

  const handleChangeQuantity = (e, id) => {
    const index = currentProductVariant.findIndex((item) => item.id === id);
    if (e.target.value < 0 || e.target.value > currentProductVariant[index].inventory) return;
    const newProductVariant = [...currentProductVariant];
    newProductVariant[index] = { ...newProductVariant[index], quantity: Number(e.target.value) };
    setCurrentProductVariant(newProductVariant);
  };

  const getTotalPrice = () => {
    let total = 0;
    currentProductVariant.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <Modal
      title="Chọn loại sản phẩm"
      open={isOpen}
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
      className="bill-modal"
    >
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
        <h3>Tổng:</h3>
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

export default VariantModal;
