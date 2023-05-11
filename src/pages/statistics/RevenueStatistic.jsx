import { CheckSquareOutlined, ExportOutlined } from '@ant-design/icons';
import { Line, Pie } from '@ant-design/plots';
import { Button, Card, DatePicker, Form, Modal, Select } from 'antd';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  exportRevenueStatisticsInRange,
  exportRevenueStatisticsInYear,
  fetchingRevenueStatisticsInRange,
  fetchingRevenueStatisticsInYear,
} from '../../redux/middleware';
import { getStatisticData } from '../../redux/selector';
import { fetchStatisticData } from '../../redux/statistic.slice';

const { RangePicker } = DatePicker;

const RevenueStatistic = () => {
  const [form] = Form.useForm();
  const [chartType, setChartType] = useState('range');
  const [isSubmit, setIsSubmit] = useState(false);
  const statisticData = useSelector(getStatisticData);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (chartType === 'range') {
      let newChartData = [...statisticData];
      newChartData = newChartData.sort((a, b) => {
        if (a.year > b.year) return 1;
        if (a.year < b.year) return -1;
        return 0;
      });
      newChartData = newChartData.map((item) => ({
        year: `${item.year}`,
        revenue: item.revenue,
      }));
      setChartData(newChartData);
    } else if (chartType === 'year') {
      let newChartData = [...statisticData];
      newChartData = newChartData.sort((a, b) => {
        if (a.month > b.month) return 1;
        if (a.month < b.month) return -1;
        return 0;
      });
      newChartData = newChartData.map((item) => ({
        month: `Tháng ${item.month}`,
        revenue: item.revenue,
      }));
      setChartData(newChartData);
    }
  }, [statisticData, chartType]);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    if (chartType === 'range') {
      const from_year = values.times[0].format('YYYY');
      const to_year = values.times[1].format('YYYY');
      dispatch(fetchingRevenueStatisticsInRange({ from_year, to_year }));
    } else {
      const year = values.time.format('YYYY');
      dispatch(fetchingRevenueStatisticsInYear({ year }));
    }
    setIsSubmit(true);
  };

  const config = {
    data: chartData,
    xField: chartType === 'range' ? 'year' : 'month',
    yField: 'revenue',
    point: {
      size: 5,
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
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
    smooth: true,
    tooltip: {
      customContent: (title, items) => {
        return (
          <div className="py-3">
            <p>
              <b>{title}</b>
            </p>
            <ul>
              {items.map((item, index) => (
                <li key={index} className="mb-2">
                  <b>
                    <span style={{ color: item.color }}>Doanh thu: </span>
                  </b>
                  <span>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(item.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      },
    },
  };

  const pieConfig = {
    appendPadding: 10,
    data: chartData,
    angleField: 'revenue',
    colorField: chartType === 'range' ? 'year' : 'month',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const handleChangeType = (value) => {
    setChartType(value);
    if (isSubmit) setIsSubmit(false);
    dispatch(fetchStatisticData([]));
  };

  const handleChangeForm = (value) => {
    if (isSubmit) setIsSubmit(false);
  };

  const handleExport = () => {
    const values = form.getFieldsValue();
    if (chartType === 'range') {
      const from_year = values.times[0].format('YYYY');
      const to_year = values.times[1].format('YYYY');
      try {
        exportRevenueStatisticsInRange('revenue-statistic-by-range.xlsx', { from_year, to_year });
      } catch (error) {
        errorModal();
      }
    } else {
      const year = values.time.format('YYYY');
      try {
        exportRevenueStatisticsInYear('revenue-statistic-in-year.xlsx', { year });
      } catch (error) {
        errorModal();
      }
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
      <Card style={{ minHeight: 'calc(100vh - 104px)' }} title={<b className="text-lg">Thống kê doanh thu</b>}>
        <Form.Item label="Kiểu thống kê">
          <Select
            defaultValue={chartType}
            style={{ width: 250 }}
            onChange={handleChangeType}
            options={[
              { value: 'range', label: 'Thống kê trong khoảng' },
              { value: 'year', label: 'Thống kê trong năm' },
            ]}
          />
        </Form.Item>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
          form={form}
          style={{ marginBottom: '20px' }}
          onValuesChange={handleChangeForm}
        >
          {chartType === 'year' ? (
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
              <DatePicker picker="year" />
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
                <RangePicker picker="year" />
              </Form.Item>
            </React.Fragment>
          ) : (
            ''
          )}
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
            <Line {...config} />
            <h2 style={{ textAlign: 'center', marginTop: 30, marginRight: 100, fontSize: 20 }}>Biểu đồ tròn</h2>
            <Pie {...pieConfig} />
          </React.Fragment>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default RevenueStatistic;
