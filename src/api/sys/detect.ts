import { defHttp } from '/@/utils/http/axios'
import { DetectModel, DetectResultModel } from './model/detectModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Detect = '/detect_api',
}

export function detectApi(params: DetectModel, mode: ErrorMessageMode = 'modal') {
  const res = defHttp.post<DetectResultModel>(
    { url: Api.Detect + '/operating_cabinet', params, timeout: 1000000 },
    { errorMessageMode: mode },
  )
  return res
}
