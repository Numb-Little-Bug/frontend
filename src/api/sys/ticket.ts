import { defHttp } from '/@/utils/http/axios'
import { AddTicketParams, TicketResultModel } from './model/ticketModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Ticket = '/ticket_api',
}

export function addTicketApi(params: AddTicketParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<TicketResultModel>({ url: Api.Ticket, params }, { errorMessageMode: mode })
}
