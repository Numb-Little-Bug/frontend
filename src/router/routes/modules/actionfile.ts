import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const actionfile: AppRouteModule = {
  path: '/actionfile',
  name: 'Actionfile',
  component: LAYOUT,
  redirect: '/actionfile/add',
  meta: {
    orderNo: 12,
    icon: 'mdi:paper-edit-outline',
    title: t('routes.demo.actionfile.Actionfile'),
  },
  children: [
    {
      path: 'add',
      name: 'Add',
      component: () => import('/@/views/actionfile/add/index.vue'),
      meta: {
        title: t('routes.demo.actionfile.add'),
        icon: 'material-symbols:add',
      },
    },
    {
      path: 'template',
      name: 'Template',
      component: () => import('/@/views/actionfile/template/index.vue'),
      meta: {
        title: t('routes.demo.actionfile.template'),
        icon: 'mdi:paper-outline',
      },
    },
  ],
}

export default actionfile
