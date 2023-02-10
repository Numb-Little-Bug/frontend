import { defHttp } from '/@/utils/http/axios'
import {
  AddTicketParams,
  TicketResultModel,
  OperationParams,
  getTicketByIdResultModel, addOperationsParams,
} from './model/ticketModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Ticket = '/ticket_api',
  Operation = '/operation_api',
  User = '/user_api',
  Site = '/site_api',
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

export function getTicketsBySiteIdApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<TicketResultModel>(
    { url: Api.Ticket + '/siteId/' + params },
    { errorMessageMode: mode },
  )
}

export function getUsernameByIdApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<TicketResultModel>(
    { url: Api.User + '/' + params },
    { errorMessageMode: mode },
  )
}

export function getSiteNameByIdApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<TicketResultModel>(
    { url: Api.Site + '/' + params },
    { errorMessageMode: mode },
  )
}

export function getTicketByIdApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<getTicketByIdResultModel>(
    { url: Api.Ticket + '/teller/' + params },
    { errorMessageMode: mode },
  )
}

export function getOperationsByTicketIdApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<addOperationsParams>(
    { url: Api.Operation + '/ticket/' + params },
    { errorMessageMode: mode },
  )
}

/*export function getTicketByIdApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<getTicketByIdResultModel>({ url: Api.Ticket }, { errorMessageMode: mode })
}*/
