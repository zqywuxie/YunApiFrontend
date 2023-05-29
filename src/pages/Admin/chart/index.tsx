import { listTopInvokeInterfaceInfoUsingGET } from '@/services/YunApi/chartController';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const InterfaceChart: React.FC = () => {
  const [data, setData] = useState<API.InvokeInterfaceInfoVO[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTopInvokeInterfaceInfoUsingGET().then((res) => {
      if (res.data) {
        setData(res.data);
        setLoading(false);
      }
    });
  }, []);

  const chartInterface = data.map((item) => {
    return {
      value: item.invokeNum,
      name: item.name,
    };
  });

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: chartInterface,
      },
    ],
  };

  return (
    <PageContainer title={'接口调用情况'}>
      <ReactECharts showLoading={loading} option={option} />
    </PageContainer>
  );
};

export default InterfaceChart;
