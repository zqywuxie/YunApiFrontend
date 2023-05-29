// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInvokeInterfaceInfo GET /api/chart/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInvokeInterfaceInfoVO_>('/api/chart/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}
