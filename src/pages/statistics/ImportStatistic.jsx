import { CheckSquareOutlined, ExportOutlined } from '@ant-design/icons';
import { DualAxes } from '@ant-design/plots';
import { Button, Card, DatePicker, Form, Modal, Select } from 'antd';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  exportImportStatisticsInMonth,
  exportRevenueStatisticsInRange,
  exportRevenueStatisticsInYear,
  fetchingImportStatisticsInMonth,
  fetchingRevenueStatisticsInRange,
  fetchingRevenueStatisticsInYear,
} from '../../redux/middleware';
import { getStatisticData } from '../../redux/selector';
import { fetchStatisticData } from '../../redux/statistic.slice';

const { RangePicker } = DatePicker;

const ImportStatistic = () => {
  const [form] = Form.useForm();
  const [chartType, setChartType] = useState('range');
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
    yField: ['total', 'total_quantity'],
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

  // const handleChangeType = (value) => {
  //   setChartType(value);
  //   if (isSubmit) setIsSubmit(false);
  //   dispatch(fetchStatisticData([]));
  // };

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
        {/* <Form.Item label="Kiểu thống kê">
          <Select
            defaultValue={chartType}
            style={{ width: 250 }}
            onChange={handleChangeType}
            options={[
              { value: 'range', label: 'Thống kê trong khoảng' },
              { value: 'year', label: 'Thống kê trong năm' },
            ]}
          />
        </Form.Item> */}
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
