import { defHttp } from '/@/utils/http/axios'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'

import { ErrorMessageMode } from '/#/axios'

//TODO:修改这个文件来和后端交互，这里是用户登陆的逻辑
enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
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