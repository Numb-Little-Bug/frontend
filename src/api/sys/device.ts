import { defHttp } from '/@/utils/http/axios'
import { DeviceResultModel, DeviceModel } from './model/deviceModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Device = '/device_api',
}

export function getDeviceApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<DeviceResultModel>(
    { url: Api.Device + '/' + params },
    { errorMessageMode: mode },
  )
}

export function getALlDeviceApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<DeviceResultModel>({ url: Api.Device }, { errorMessageMode: mode })
}

export function postDeviceApi(params: DeviceModel, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<DeviceResultModel>({ url: Api.Device, params }, { errorMessageMode: mode })
}

export function getItemsApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<DeviceResultModel>(
    { url: Api.Device + '/items' + '/' + params },
    { errorMessageMode: mode },
  )
}
