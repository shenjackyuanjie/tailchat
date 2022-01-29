/**
 * 同步加载的代码
 * 用于导出常见的模块依赖
 */

import _pick from 'lodash/pick';
export * from './reg';
export {
  useGroupPanelParams,
  useCurrentGroupPanelInfo,
} from '@/routes/Main/Content/Group/utils';
export {
  openModal,
  closeModal,
  ModalWrapper,
  useModalContext,
} from '@/components/Modal';
export { Loadable } from '@/components/Loadable';
export { getGlobalState } from '@/utils/global-state-helper';
export { dataUrlToFile } from '@/utils/file-helper';
import { request, RequestConfig } from 'tailchat-shared';
export {
  getCachedUserInfo,
  getCachedConverseInfo,
  localTrans,
  getLanguage,
  sharedEvent,
  useAsync,
  useAsyncFn,
  useAsyncRefresh,
  uploadFile,
  showToasts,
  showErrorToasts,
  createFastFormSchema,
  fieldSchema,
} from 'tailchat-shared';

/**
 * 处理axios的request config
 *
 * 为了防止用户的jwt因为请求被传递到其他地方
 */
function purgeRequestConfig(config?: RequestConfig) {
  if (!config) {
    return undefined;
  }

  return _pick(config, [
    'transformRequest',
    'transformResponse',
    'headers',
    'params',
    'data',
    'timeout',
    'withCredentials',
    'xsrfCookieName',
    'xsrfHeaderName',
  ]);
}

/**
 * 插件仅可以通过这种方式进行网络请求发送
 */
export function createPluginRequest(pluginName: string) {
  return {
    get(actionName: string, config?: RequestConfig) {
      return request.get(
        `/api/plugin:${pluginName}/${actionName}`,
        purgeRequestConfig(config)
      );
    },
    post(actionName: string, data?: any, config?: RequestConfig) {
      return request.post(
        `/api/plugin:${pluginName}/${actionName}`,
        data,
        purgeRequestConfig(config)
      );
    },
  };
}

/**
 * 发起一个网络请求
 *
 * 与上面的相比，是不限定在plugin中的
 */
export function postRequest(url: string, data?: any, config?: RequestConfig) {
  return request.post(`/api${url}`, data, purgeRequestConfig(config));
}
