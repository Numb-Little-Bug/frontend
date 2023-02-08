import { defHttp } from '/@/utils/http/axios'
import { ListResultModel } from './model/listModel'
import { ErrorMessageMode } from '/#/axios'

export enum Api {
  Ticket = '/ticket_api',
  Operation = '/operation_api',
  User = '/user_api',
  Site = '/site_api',
}

export function getTicketByIdApi(params: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<ListResultModel>(
    { url: Api.Ticket + '/operator/' + params },
    { errorMessageMode: mode },
  )
}
