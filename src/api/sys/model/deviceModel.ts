export interface DeviceModel {
  type: string

  lights: Object

  straps: Object

  switches: Object
}

export interface DeviceResultModel {
  code: number
  msg: string
  obj: any
}

