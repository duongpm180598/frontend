import { CheckSquareOutlined, ExportOutlined } from '@ant-design/icons';
import { DualAxes } from '@ant-design/plots';
import { Button, Card, DatePicker, Form, Modal } from 'antd';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportImportStatisticsInMonth, fetchingImportStatisticsInMonth } from '../../redux/middleware';
import { getStatisticData } from '../../redux/selector';
import { fetchStatisticData } from '../../redux/statistic.slice';

const ImportStatistic = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const statisticData = useSelector(getStatisticData);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const month = values.time.format('M');
    const year = values.time.format('YYYY');
    dispatch(fetchingImportStatisticsInMonth({ month, year }));
    setIsSubmit(true);
  };

  const config = {
    data: [statisticData, statisticData],
    xField: 'name',
    yField: ['total_quantity', 'total'],
    geometryOptions: [
      {
        geometry: 'column',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: false,
        autoEllipsis: false,
      },
    },
    tooltip: {
      customContent: (title, items) => {
        return (
          <div className="py-3">
            <p>
              <b>Sản phẩm: </b>
              {title}
            </p>
            <ul>
              {items.map((item, index) => (
                <li key={index} className="mb-2">
                  <span style={{ color: item.color }}>{item.name === 'total' ? 'Doanh thu' : 'Số lượng'}: </span>
                  <strong>
                    {item.name === 'total'
                      ? new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(item.value)
                      : item.value}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        );
      },
    },
  };

  const handleChangeForm = (value) => {
    if (isSubmit) setIsSubmit(false);
  };

  const handleExport = () => {
    const values = form.getFieldsValue();
    const month = values.time.format('M');
    const year = values.time.format('YYYY');
    try {
      exportImportStatisticsInMonth('import-statistic-by-range.xlsx', { month, year });
    } catch (error) {
      errorModal();
    }
  };

  const errorModal = () => {
    Modal.error({
      title: 'This is an error message',
      content: 'Có lỗi đã xảy ra',
    });
  };

  useEffect(() => {
    return () => {
      dispatch(fetchStatisticData([]));
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Card style={{ minHeight: 'calc(100vh - 104px)' }} title={<b className="text-lg">Thống kê nhập hàng</b>}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
          form={form}
          style={{ marginBottom: '20px' }}
          onValuesChange={handleChangeForm}
        >
          <Form.Item
            label="Thời gian"
            name="time"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn thời gian muốn thống kê!',
              },
            ]}
          >
            <DatePicker picker="month" />
          </Form.Item>
          <div>
            <Button
              type="danger"
              style={{ display: 'flex', alignItems: 'center', marginRight: '20px', backgroundColor: '#FF4D4F' }}
              htmlType="submit"
            >
              <CheckSquareOutlined />
              Xác nhận
            </Button>
          </div>
        </Form>
        {isSubmit && statisticData.length === 0 ? (
          <span>Không có dữ liệu</span>
        ) : isSubmit && statisticData.length !== 0 ? (
          <React.Fragment>
            <div className="flex justify-end">
              <Button
                type="primary"
                style={{ display: 'flex', alignItems: 'center', float: '', backgroundColor: '#1677ff' }}
                onClick={handleExport}
              >
                <ExportOutlined />
                Xuất báo cáo
              </Button>
            </div>

            <DualAxes {...config} />
          </React.Fragment>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default ImportStatistic;
