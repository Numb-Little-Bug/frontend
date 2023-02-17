import { defHttp } from '/@/utils/http/axios'
import { DetectResultModel } from './model/detectModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Detect = '/detect_api',
}

export function detectApi(mode: ErrorMessageMode = 'modal') {
  const res = defHttp.get<DetectResultModel>({ url: Api.Detect }, { errorMessageMode: mode })
  console.log(res)
  return res
}
