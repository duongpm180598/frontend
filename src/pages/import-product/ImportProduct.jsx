import { FileDoneOutlined, LeftOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@mui/icons-material';
import { Button, Input, Space, Steps, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import BillModal from '../../Components/Admin/import/BillModal';
import { fetchingProductVariant, fetchingProducts, fetchingSupplier } from '../../redux/middleware';
import { getProductVariant, getProducts, getSuppliers } from '../../redux/selector';

const ImportProduct = () => {
  const [activeStep, setActiveStep] = useState(0);
  const suppliers = useSelector(getSuppliers).suppliers;
  const products = useSelector(getProducts).products;
  const productVariant = useSelector(getProductVariant);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleResetStep = () => {
    setActiveStep(0);
    setSelectedRowKeys([]);
  };

  const handleResetFilter = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              backgroundColor: '#1677ff',
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleResetFilter(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSelectSupplier = (item) => {
    setSelectedSupplier(item);
    handleNext();
  };

  const handleSelectProduct = (item) => {
    setSelectedProduct(item);
    handleNext();
    dispatch(fetchingProductVariant(item.id));
  };

  const supplierColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      render: (item) => (
        <Button type="primary" style={{ backgroundColor: '#1677ff' }} onClick={() => handleSelectSupplier(item)}>
          Chọn
        </Button>
      ),
    },
  ];

  const productColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Price',
      dataIndex: 'base_cost',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      render: (item) => (
        <Button type="primary" style={{ backgroundColor: '#1677ff' }} onClick={() => handleSelectProduct(item)}>
          Chọn
        </Button>
      ),
    },
  ];

  const variantColumn = [
    {
      title: 'Size',
      key: 'size',
      render: (item) => {
        return item.variant_attributes[0].value;
      },
      sorter: (a, b) => a.variant_attributes[0].value.localeCompare(b.variant_attributes[0].value),
    },
    {
      title: 'Màu',
      key: 'color',
      render: (item) => {
        return item.variant_attributes[1].value;
      },
      sorter: (a, b) => a.variant_attributes[1].value.localeCompare(b.variant_attributes[1].value),
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Trọng lượng',
      key: 'weight',
      dataIndex: 'weight',
    },
    {
      title: 'Hàng tồn kho',
      key: 'inventory',
      dataIndex: 'inventory',
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingSupplier());
    dispatch(fetchingProducts());
  }, []);

  const onSelectChange = (newSelectedRowKeys, selectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const toggleModal = (show) => {
    setIsModalOpen(show);
  };

  return (
    <div style={{padding: 20}}>
      <Steps
        current={activeStep}
        items={[
          {
            title: 'Chọn nhà cung cấp',
          },
          {
            title: 'Chọn sản phẩm',
          },
          {
            title: 'Chọn loại sản phẩm',
          },
        ]}
        style={{ marginBottom: '20px' }}
      />
      {activeStep === 0 ? (
        <React.Fragment>
          <Table columns={supplierColumn} dataSource={suppliers} />
        </React.Fragment>
      ) : activeStep === 1 ? (
        <React.Fragment>
          <Table columns={productColumn} dataSource={products} />
          <Button icon={<LeftOutlined />} style={{ display: 'flex', alignItems: 'center' }} onClick={handleBack}>
            Back
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Table
            pagination={{
              position: ['bottomCenter'],
            }}
            rowKey="id"
            columns={variantColumn}
            dataSource={productVariant}
            rowSelection={rowSelection}
          />
          <div className="flex justify-between">
            <Button icon={<LeftOutlined />} style={{ display: 'flex', alignItems: 'center' }} onClick={handleBack}>
              Back
            </Button>
            <Button
              icon={<FileDoneOutlined />}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => toggleModal(true)}
              type="primary"
              disabled={selectedRowKeys.length === 0}
            >
              Xuất bill
            </Button>
          </div>
          <BillModal
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            selectedRowKeys={selectedRowKeys}
            selectedSupplier={selectedSupplier}
            selectedProduct={selectedProduct}
            resetStep={handleResetStep}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default ImportProduct;
