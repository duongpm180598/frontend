import { CheckSquareOutlined, ExportOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
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
    data: statisticData,
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
              style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
              htmlType="submit"
            >
              <CheckSquareOutlined />
              Confirm
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
                style={{ display: 'flex', alignItems: 'center', float: '' }}
                onClick={handleExport}
              >
                <ExportOutlined />
                Xuất báo cáo
              </Button>
            </div>

            <Line {...config} />
          </React.Fragment>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default RevenueStatistic;