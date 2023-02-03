export interface AddTicketParams {
  name: string

  teller: string

  operator: string

  notice: string

  publisher: string

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
