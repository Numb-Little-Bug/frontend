import { defHttp } from '/@/utils/http/axios'
import {
  AddTicketParams,
  TicketResultModel,
  OperationParams,
} from './model/ticketModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Ticket = '/ticket_api',
  Operation = '/operation_api',
}

export function addTicketApi(params: AddTicketParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<TicketResultModel>({ url: Api.Ticket, params }, { errorMessageMode: mode })
}

export function addOperationsApi(params: OperationParams[], mode: ErrorMessageMode = 'modal') {
  return defHttp.post<TicketResultModel>(
    { url: Api.Operation + '/batch', params },
    { errorMessageMode: mode },
  )
}
