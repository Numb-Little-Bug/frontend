import { defHttp } from '/@/utils/http/axios'
import {
  LoginParams,
  RegisterParams,
  RegisterResultModel,
  LoginResultModel,
  GetUserInfoModel,
} from './model/userModel'

import { ErrorMessageMode } from '/#/axios'

//TODO:修改这个文件来和后端交互，这里是用户登陆的逻辑
enum Api {
  Login = '/user_api',
  Register = '/user_api',
  Logout = '/user_api/logout',
  GetUserInfo = '/user_api',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login + '/' + params.tel,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export function getSiteUserApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<LoginResultModel>(
    {
      url: Api.Login + '/role/site',
    },
    {
      errorMessageMode: mode,
    },
  )
}
export function getDispatchUserApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<LoginResultModel>(
    {
      url: Api.Login + '/role/dispatch',
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: user register api
 */
export function registerApi(params: RegisterParams, mode: ErrorMessageMode = 'modal') {
  const ret = defHttp.post<RegisterResultModel>(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
  console.log(ret)
  return ret
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout })
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  )
}
