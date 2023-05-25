import { listInterfaceInfoByPageUsingGET } from '@/services/YunApi/interfaceController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'主页'}>
      <List
        className="interfaceInfo-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        pagination={{
          showSizeChanger: true,
          total: total,
          showTotal(total, range) {
            return `${range[0]}-${range[1]} / ${total}`;
          },
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
        renderItem={(item) => {
          const apiUrl = `/interfaceInfo/${item.id}`;
          return (
            <List.Item
              actions={[
                <a key="list-more" href={apiUrl}>
                  查看详情
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href={apiUrl}>{item.name}</a>}
                description={item.description}
              />
              <div>{item.method}</div>
            </List.Item>
          );
        }}
      />
    </PageContainer>
  );
};

export default Index;
