import { defHttp } from '/@/utils/http/axios'
import { DeviceResultModel, DeviceModel } from './model/deviceModel'
import { ErrorMessageMode } from '/#/axios'
import { ItemModel } from './model/ItemModel'

export enum Api {
  Device = '/device_api',
  Item = '/item_api',
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
    { url: Api.Item + '/device/' + params },
    { errorMessageMode: mode },
  )
}

export function postItemApi(
  params: ItemModel[],
  device_id: number,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<DeviceResultModel>(
    { url: Api.Item + device_id, params },
    { errorMessageMode: mode },
  )
}

export function getItemApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<DeviceResultModel>(
    { url: Api.Item + '/item/' + params },
    { errorMessageMode: mode },
  )
}

export function getItemStatusApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<DeviceResultModel>(
    { url: Api.Item + '/status/' + params },
    { errorMessageMode: mode },
  )
}
