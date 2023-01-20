import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const todo: AppRouteModule = {
  path: '/todolist',
  name: 'Todolist',
  component: LAYOUT,
  redirect: '/todolist/list',
  meta: {
    orderNo: 13,
    hideChildrenInMenu: true,
    icon: 'wpf:todolist',
    title: t('routes.demo.todo.list'),
  },
  children: [
    {
      path: 'list',
      name: 'SiteDemoPage',
      component: () => import('/@/views/todolist/index.vue'),
      meta: {
        title: t('routes.demo.todo.list'),
        icon: 'wpf:todolist',
        hideMenu: true,
      },
    },
  ],
}

export default todo
