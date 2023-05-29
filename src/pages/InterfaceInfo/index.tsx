import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceUsingPOST,
} from '@/services/YunApi/interfaceController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Form, message } from 'antd';
import { Badge } from 'antd-mobile-alita';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [resData, setResData] = useState<any>();
  const params = useParams();
  const loadData = async () => {
    if (!params.id) {
      message.error('接口不存在，请重试');
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res?.data);
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);
  };
  const onFinish = async (values: API.InvokeInterfaceRequest) => {
    if (!params.id) {
      message.error('接口不存在，请重试');
    }
    setLoading(true);
    try {
      const res = await invokeInterfaceUsingPOST({
        id: data?.id,
        ...values,
      });
      setResData(res?.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'接口文档'}>
      <Card loading={loading}>
        {data ? (
          <Descriptions title={data.name} column={2} layout="vertical" bordered={true}>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="接口状态">
              {data.status === 0 ? (
                <Badge text={'关闭'} status={'default'} />
              ) : (
                <Badge text={'启用'} status={'processing'} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {moment(data.createTime).format('yyyy-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {moment(data.updateTime).format('yyyy-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>

      {/*todo 后续优化，参考knife4j，不同方法不同界面*/}
      <Card title={'在线调用'}>
        <Form name="basic" layout={'vertical'} onFinish={onFinish}>
          <Form.Item label="请求参数" name="requestParams">
            <TextArea />
          </Form.Item>
          <Form.Item>
            {/*todo 调用接口*/}
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {resData ? <Card title={'调用结果'}>{resData}</Card> : null}
    </PageContainer>
  );
};

export default Index;
