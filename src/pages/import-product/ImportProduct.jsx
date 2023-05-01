import React, { useEffect, useRef, useState } from 'react';
import { Space, Table, Button, Input, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProductVariant, fetchingProducts, fetchingSupplier } from '../../redux/middleware';
import { getProductVariant, getProducts, getSuppliers } from '../../redux/selector';
import { SearchOutlined } from '@mui/icons-material';
import Highlighter from 'react-highlight-words';
import { LeftOutlined, FileDoneOutlined } from '@ant-design/icons';
import BillModal from '../../Components/Admin/import/BillModal';

const ImportProduct = () => {
  const [activeStep, setActiveStep] = useState(0);
  const suppliers = useSelector(getSuppliers).suppliers;
  const products = useSelector(getProducts).products;
  const productVariant = useSelector(getProductVariant);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
  const handleExportBill = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 65px)' }}>
      <div className="flex-none min-w-[200px] bg-slate-500"></div>
      <div className="flex-auto px-5 py-5">
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
          className="mb-3"
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
                  backgroundColor: selectedRowKeys.length !== 0 && '#1677ff',
                }}
                onClick={handleExportBill}
                type="primary"
                disabled={selectedRowKeys.length === 0}
              >
                Xuất bill
              </Button>
            </div>
            <BillModal
              isModalOpen={isModalOpen}
              handleOk={handleOk}
              handleCancel={handleCancel}
              selectedRowKeys={selectedRowKeys}
              selectedSupplier={selectedSupplier}
              selectedProduct={selectedProduct}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ImportProduct;
