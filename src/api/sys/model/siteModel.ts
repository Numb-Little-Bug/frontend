/**
 * @description: New site interface parameters
 */
export interface SiteParams {
  name: string
}

export interface VideoParams {
  file: any
  siteId: number
}

export interface SiteResultModel {
  code: number
  msg: string
  obj: any
}

export interface VideoResultModel {
  code: number
  msg: string
  obj: any
}
