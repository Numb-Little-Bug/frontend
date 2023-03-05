export interface DetectModel {
  source: string
  device_type_conf: Object
}

export interface DetectResultModel {
  code: number
  msg: string
  obj: any
}
