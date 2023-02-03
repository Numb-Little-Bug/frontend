export interface AddTicketParams {
  name: string

  tellerId: number

  operatorId: number

  notice: string

  publisherId: number

  siteId: number

  startTime: string

  endTime: string

  remark: string

  status: 0
}

export interface TicketResultModel {
  code: number
  msg: string
  obj: any
}
