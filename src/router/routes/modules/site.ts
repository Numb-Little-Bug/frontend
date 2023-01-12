import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const setup: AppRouteModule = {
  path: '/site',
  name: 'SiteDemo',
  component: LAYOUT,
  redirect: '/site/index',
  meta: {
    orderNo: 90000,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll',
    title: t('routes.demo.site.page'),
  },
  children: [
    {
      path: 'index',
      name: 'SetupDemoPage',
      component: () => import('/@/views/siteside/index.vue'),
      meta: {
        title: t('routes.demo.site.page'),
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
}

export default setup
