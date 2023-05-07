import { CheckSquareOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Select, Card, Modal } from 'antd';
import { default as React, useEffect, useState } from 'react';
import { MONTHS } from '../../utils/utils';
import { DualAxes } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { getStatisticData } from '../../redux/selector';
import {
  exportProductStatisticsInMonth,
  exportProductStatisticsInRange,
  fetchingProductStatisticsInMonth,
  fetchingProductStatisticsInRange,
} from '../../redux/middleware';
import { fetchStatisticData } from '../../redux/statistic.slice';

const { RangePicker } = DatePicker;

const ProductStatistic = () => {
  const [form] = Form.useForm();
  const statisticData = useSelector(getStatisticData);
  const [chartType, setChartType] = useState('range');
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(fetchStatisticData([]));
    };
  }, []);

  const handleSubmit = async (values) => {
    if (chartType === 'range') {
      const from = values.times[0].format('YYYY-MM-DD');
      const to = values.times[1].format('YYYY-MM-DD');
      const group_by = values.group;
      dispatch(fetchingProductStatisticsInRange({ from, to, group_by }));
    } else {
      const month = values.time.format('M');
      const year = values.time.format('YYYY');
      dispatch(fetchingProductStatisticsInMonth({ month, year }));
    }
    setIsSubmit(true);
  };

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
    if (isSubmit) setIsSubmit(false);
    dispatch(fetchStatisticData([]));
  };

  const handleChangeForm = (value) => {
    if (isSubmit) setIsSubmit(false);
  };

  const handleExport = () => {
    const values = form.getFieldsValue();
    if (chartType === 'range') {
      const from = values.times[0].format('YYYY-MM-DD');
      const to = values.times[1].format('YYYY-MM-DD');
      const group_by = values.group;
      try {
        exportProductStatisticsInRange('product-statistic-by-range.xlsx', { from, to, group_by });
      } catch (error) {
        errorModal();
      }
    } else {
      const month = values.time.format('M');
      const year = values.time.format('YYYY');
      try {
        exportProductStatisticsInMonth('product-statistic-in-month.xlsx', { month, year });
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

  return (
    <div style={{ padding: 20 }}>
      <Card style={{ minHeight: 'calc(100vh - 104px)' }} title={<b className="text-lg">Thống kê sản phẩm</b>}>
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
          style={{ marginBottom: '20px' }}
          onValuesChange={handleChangeForm}
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
          ) : ''}
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
        ) : chartType === 'month' && isSubmit ? (
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

            <DualAxes {...config} />
          </React.Fragment>
        ) : (
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

            <DualAxes {...config} />
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

export default ProductStatistic;
