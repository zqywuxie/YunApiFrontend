import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { userLoginUsingPOST } from '@/services/YunApi/userController';
import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
    </>
  );
};
const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const msg = await userLoginUsingPOST({
        ...values,
      });
      if (msg.data) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        // todo 保存状态
        setInitialState({
          loginUser: msg.data,
        });
        return;
      }
      // 如果失败去设置用户错误信息
      // @ts-ignore
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  // @ts-ignore
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Yun Api"
          subTitle={'免费的开放式Api调用平台'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            centered
            items={[
              {
                key: 'register',
                label: '用户注册',
              },
            ]}
          />
          <ProFormText
            name="userName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={'用户昵称:1~7位'}
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={'用户账号：6~10位'}
            rules={[
              {
                required: true,
                message: '用户账号是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={'用户密码：至少8位'}
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={'确认密码'}
            rules={[
              {
                required: true,
                message: '确认密码是必填项！',
              },
            ]}
          />
          <ProFormText
            name="phone"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={'手机号'}
            rules={[
              {
                required: true,
                message: '请填入你的手机号！',
              },
              {
                pattern:
                  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                message: '手机格式错误',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={'请输入验证码！'}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'秒后重新获取'}`;
              }
              return '获取验证码';
            }}
            name="captcha"
            rules={[
              {
                required: true,
                message: '验证码是必填项！',
              },
            ]}
            onGetCaptcha={async (phone) => {
              const result = await getFakeCaptcha({
                phone,
              });
              if (!result) {
                return;
              }
              message.success('获取验证码成功！验证码为：1234');
            }}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
