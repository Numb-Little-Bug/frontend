import { defHttp } from '/@/utils/http/axios'
import { SiteResultModel, SiteParams } from './model/siteModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Site = '/site_api',
  Video = '/video_api',
}
/**
 * @description: siteApi
 */
export function siteApi(params: SiteParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<SiteResultModel>({ url: Api.Site, params }, { errorMessageMode: mode })
}

export function getSiteApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<SiteResultModel>({ url: Api.Site }, { errorMessageMode: mode })
}
