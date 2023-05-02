import { CheckSquareOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Select } from 'antd';
import { default as React, useEffect, useState } from 'react';
import { MONTHS } from '../../utils/utils';
import { Line } from '@ant-design/plots';

const { RangePicker } = DatePicker;

const Statistic = () => {
  const [form] = Form.useForm();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('year');

  const handleSubmit = async (values) => {
    const yearFrom = values.time[0].format('YYYY');
    const yearTo = values.time[1].format('YYYY');
    if (yearFrom === yearTo) {
    }
    const newData = [];
    MONTHS.forEach((month, index) => {
      newData.push({ month, value: response[index] });
    });

    setChartData(newData);
  };

  const response = [
    1000000, 2000000, 5000000, 12000000, 7000000, 15000000, 8000000, 5000000, 12000000, 7000000, 3000000, 9000000,
  ];

  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    point: {
      size: 5,
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          value: new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(data.value),
        };
      },
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
    style: {
      maxHeight: '350px',
    },
    smooth: true,
  };

  const handleChangeType = (value) => {
    setChartType(value);
    setChartData([]);
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 65px)' }}>
      <div className="flex-none min-w-[200px] bg-slate-500"></div>
      <div className="flex-auto px-5 py-5">
        <p style={{ fontSize: '20px' }}>
          <b>Thống kê theo doanh thu</b>
        </p>

        <Form.Item label="">
          <Select
            defaultValue={chartType}
            style={{ width: 120 }}
            onChange={handleChangeType}
            options={[
              { value: 'month', label: 'Theo tháng' },
              { value: 'year', label: 'Theo Năm' },
            ]}
          />
        </Form.Item>

        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
          form={form}
          style={{ marginBottom: '50px' }}
        >
          <Form.Item
            name="time"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn thời gian muốn thống kê!',
              },
            ]}
          >
            {chartType === 'month' ? <DatePicker picker="month" /> : <DatePicker picker="year" />}
          </Form.Item>
          <div>
            <Button
              type="danger"
              style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
              htmlType="submit"
            >
              <CheckSquareOutlined />
              Confirm
            </Button>
          </div>
        </Form>
        <Line {...config} />
      </div>
    </div>
  );
};

export default Statistic;
