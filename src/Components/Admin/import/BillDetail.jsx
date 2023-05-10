import { CheckCircleTwoTone, LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Button, Input, List, Modal } from 'antd/es';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createBill, exportBill } from '../../../redux/middleware';
import { getProducts } from '../../../redux/selector';

const BillDetail = ({
  handleBack,
  selectedVariantList,
  handleChangeSelectedVariantList,
  selectedSupplier,
  resetStep,
}) => {
  let billId = '';
  const products = useSelector(getProducts).products;
  const [displayVariantList, setDisplayVariantList] = useState([]);
  const [listProductSelected, setListProductSelected] = useState([]);

  useEffect(() => {
    transformData();
  }, [selectedVariantList]);

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const transformData = () => {
    const data = selectedVariantList && groupBy(selectedVariantList, 'product_id');
    const products = [];
    const variants = [];
    Object.keys(data).forEach((key) => {
      products.push(key);
      variants.push(data[key]);
    });
    setListProductSelected(products);
    setDisplayVariantList(variants);
  };

  const handleChangeQuantity = (e, id) => {
    const index = selectedVariantList.findIndex((item) => item.id === id);
    if (e.target.value <= 0 || e.target.value > selectedVariantList[index].inventory) return;
    const newProductVariant = [...selectedVariantList];
    newProductVariant[index] = { ...newProductVariant[index], quantity: Number(e.target.value) };
    handleChangeSelectedVariantList(newProductVariant);
  };

  const getTotalPrice = () => {
    let total = 0;
    selectedVariantList.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleCreateBill = async () => {
    const data = {
      supplier_id: selectedSupplier.id,
      items: selectedVariantList.map((item) => ({
        variant_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      })),
    };
    try {
      billId = await createBill(data);
      success();
    } catch (error) {
      errorModal();
    }
  };

  const handleExportBill = async () => {
    try {
      exportBill(billId, 'bill.xlsx');
    } catch (error) {
      errorModal();
    } finally {
      resetStep();
    }
  };

  const errorModal = () => {
    Modal.error({
      title: 'This is an error message',
      content: 'Có lỗi đã xảy ra',
    });
  };

  const success = () => {
    Modal.confirm({
      title: 'Tạo bill thành công',
      content: 'Bạn có muốn xuất hóa đơn không?',
      onOk: handleExportBill,
      onCancel: () => {
        Modal.destroyAll();
      },
      okText: 'Có',
      cancelText: 'Không',
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const getProductName = (id) => {
    return products.find((item) => item.id === id).name;
  };

  const handleDeleteVariant = (id) => {
    const newVariants = [...selectedVariantList];
    const index = newVariants.findIndex((item) => item.id === id);
    newVariants.splice(index, 1);
    handleChangeSelectedVariantList(newVariants);
  };

  return (
    <React.Fragment>
      <h3>
        <b>Nhà cung cấp: </b>
        {selectedSupplier.name}
      </h3>
      <Card className="mt-3">
        {listProductSelected.map((productId, index) => (
          <List
            header={
              <b>
                <i>{getProductName(productId)}:</i>
              </b>
            }
            itemLayout="horizontal"
            dataSource={displayVariantList[index]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={`${item.variant_attributes[0].name}: ${item.variant_attributes[0].value}, ${item.variant_attributes[1].name}: ${item.variant_attributes[1].value}`}
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
                <DeleteOutlined
                  onClick={() => handleDeleteVariant(item.id)}
                  style={{ fontSize: 17, marginLeft: 20, color: '#FF0000' }}
                />
              </List.Item>
            )}
          />
        ))}
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
      <div className="flex justify-between">
        <Button icon={<LeftOutlined />} style={{ display: 'flex', alignItems: 'center' }} onClick={handleBack}>
          Trở về
        </Button>
        <Button key="submit" type="primary" onClick={handleCreateBill} style={{ backgroundColor: '#1677ff' }}>
          Xác nhận
        </Button>
      </div>
    </React.Fragment>
  );
};

export default BillDetail;
