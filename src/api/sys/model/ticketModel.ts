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

  deviceTypeId: number | null
}

export interface ChangeTicketStatusParams {
  status: number
}

export interface TicketResultModel {
  code: number
  msg: string
  obj: any
}

export interface OperationParams {
  type: string
  description: string
  stepNumber: number
  itemId: number | null
  ticketId: number | null
  notice: string
}

export interface addOperationsParams {
  operations: OperationParams[]
}

//export type getTicketByIdResultModel = AddTicketParams[]
export interface getTicketByIdResultModel {
  tickets: AddTicketParams[]
}
