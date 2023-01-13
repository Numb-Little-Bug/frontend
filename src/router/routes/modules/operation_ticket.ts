import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const operation_ticket: AppRouteModule = {
  path: '/operation_ticket',
  name: 'OperationTicket',
  component: LAYOUT,
  redirect: '/operation_ticket/add',
  meta: {
    orderNo: 12,
    icon: 'mdi:paper-edit-outline',
    title: t('routes.demo.operation_ticket.operation_ticket'),
  },
  children: [
    {
      path: 'add',
      name: 'Add',
      component: () => import('/src/views/operation_ticket/add/index.vue'),
      meta: {
        title: t('routes.demo.operation_ticket.add'),
        icon: 'material-symbols:add',
      },
    },
    {
      path: 'template',
      name: 'Template',
      component: () => import('/src/views/operation_ticket/template/index.vue'),
      meta: {
        title: t('routes.demo.operation_ticket.template'),
        icon: 'mdi:paper-outline',
      },
    },
  ],
}

export default operation_ticket
