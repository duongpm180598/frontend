import { CheckSquareOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Select, Card, Modal } from 'antd';
import { default as React, useEffect, useState } from 'react';
import { MONTHS } from '../../utils/utils';
import { DualAxes, Column } from '@ant-design/plots';
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
  const [chartType, setChartType] = useState('month');
  const [isSubmit, setIsSubmit] = useState(false);
  const [dataChart, setDataChart] = useState();
  const [dataChart2, setDataChart2] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(fetchStatisticData([]));
    };
  }, []);

  useEffect(() => {
    if (chartType === 'range') {
      if (form.getFieldsValue().group === 'month') {
        const newData = statisticData.map((item) => ({
          time: `${item.month}/${item.year}`,
          sold: item.sold,
        }));
        setDataChart(newData);
        const newData2 = statisticData.map((item) => ({
          time: `${item.month}/${item.year}`,
          total: item.total,
          name: item.name,
        }));
        setDataChart(newData2);
        console.log(newData, newData2);
      } else {
      }
    }
  }, [statisticData]);

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

  const configRangeMonth = {
    data: dataChart2,
    isGroup: true,
    xField: 'time',
    yField: 'total',
    seriesField: 'name',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  const configRangeYear = {
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
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: false,
        autoEllipsis: false,
      },
    },
  };

  const configMonth = {
    data: [statisticData, statisticData],
    xField: 'name',
    yField: ['sold', 'total'],
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
                  <span style={{ color: item.color }}>{item.name === 'total' ? 'Doanh thu' : 'Đã bán'}: </span>
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
        {/* <Form.Item label="Kiểu thống kê">
          <Select
            defaultValue={chartType}
            style={{ width: 250 }}
            onChange={handleChangeType}
            options={[
              { value: 'range', label: 'Thống kê trong khoảng' },
              { value: 'month', label: 'Thống kê trong tháng' },
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
        ) : chartType === 'month' && isSubmit ? (
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
            <DualAxes {...configMonth} />
          </React.Fragment>
        ) : chartType === 'range' && isSubmit ? (
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

            {/* <Column {...configRangeMonth} /> */}
          </React.Fragment>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default ProductStatistic;
