import { CheckSquareOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Select } from 'antd';
import { default as React, useEffect, useState } from 'react';
import { MONTHS } from '../../utils/utils';
import { DualAxes } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { getStatisticData } from '../../redux/selector';
import { fetchingStatisticsInMonth } from '../../redux/middleware';
import { fetchStatisticData } from '../../redux/statistic.slice';

const { RangePicker } = DatePicker;

const Statistic = () => {
  const [form] = Form.useForm();
  const statisticData = useSelector(getStatisticData);
  const [chartType, setChartType] = useState('range');
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    if (chartType === 'range') {
      const yearFrom = values.times[0].format('YYYY-MM-DD');
      const yearTo = values.times[1].format('YYYY-MM-DD');
      const group = values.group;
      console.log(yearFrom, yearTo, group);
    } else {
      const month = values.time.format('M');
      const year = values.time.format('YYYY');
      dispatch(fetchingStatisticsInMonth({ month, year }));
    }
    const newData = [];
    MONTHS.forEach((month, index) => {
      newData.push({ month, value: response[index] });
    });
  };

  const response = [
    1000000, 2000000, 5000000, 12000000, 7000000, 15000000, 8000000, 5000000, 12000000, 7000000, 3000000, 9000000,
  ];

  // const config = {
  //   data: chartData,
  //   xField: 'month',
  //   yField: 'value',
  //   point: {
  //     size: 5,
  //     style: {
  //       fill: 'white',
  //       stroke: '#5B8FF9',
  //       lineWidth: 2,
  //     },
  //   },
  //   tooltip: {
  //     formatter: (data) => {
  //       return {
  //         value: new Intl.NumberFormat('vi-VN', {
  //           style: 'currency',
  //           currency: 'VND',
  //         }).format(data.value),
  //       };
  //     },
  //   },
  //   state: {
  //     active: {
  //       style: {
  //         shadowBlur: 4,
  //         stroke: '#000',
  //         fill: 'red',
  //       },
  //     },
  //   },
  //   interactions: [
  //     {
  //       type: 'marker-active',
  //     },
  //   ],
  //   style: {
  //     maxHeight: '350px',
  //   },
  //   smooth: true,
  // };

  const config = {
    data: [statisticData, statisticData],
    xField: 'name',
    yField: ['total', 'sold'],
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
  };

  const handleChangeType = (value) => {
    setChartType(value);
    dispatch(fetchStatisticData([]))
  };

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 65px)' }}>
      <div className="flex-none min-w-[200px] bg-slate-500"></div>
      <div className="flex-auto px-5 py-5">
        <p style={{ fontSize: '20px' }}>
          <b>Thống kê doanh thu</b>
        </p>

        <Form.Item label="Kiểu thống kê">
          <Select
            defaultValue={chartType}
            style={{ width: 250 }}
            onChange={handleChangeType}
            options={[
              { value: 'range', label: 'Thống kê trong khoảng' },
              { value: 'month', label: 'Thống kê trong tháng' },
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
          {chartType === 'month' ? (
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
          ) : chartType === 'range' ? (
            <React.Fragment>
              <Form.Item
                label="Thời gian"
                name="times"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn thời gian muốn thống kê!',
                  },
                ]}
              >
                <RangePicker picker="date" />
              </Form.Item>
              <Form.Item
                name="group"
                label="Nhóm"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn nhóm thống kê',
                  },
                ]}
                initialValue={'month'}
              >
                <Select
                  style={{ width: 250 }}
                  options={[
                    { value: 'year', label: 'Theo năm' },
                    { value: 'month', label: 'Theo tháng' },
                  ]}
                />
              </Form.Item>
            </React.Fragment>
          ) : (
            ''
          )}
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
        {chartType === 'month' ? <DualAxes {...config} /> : chartType === ''}
      </div>
    </div>
  );
};

export default Statistic;
