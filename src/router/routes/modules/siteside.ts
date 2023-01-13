import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const siteside: AppRouteModule = {
  path: '/siteside',
  name: 'SitesideDemo',
  component: LAYOUT,
  redirect: '/siteside/index',
  meta: {
    orderNo: 11,
    hideChildrenInMenu: true,
    icon: 'uim:airplay',
    title: t('routes.demo.siteside.page'),
  },
  children: [
    {
      path: 'index',
      name: 'SitesideDemoPage',
      component: () => import('/@/views/siteside/index.vue'),
      meta: {
        title: t('routes.demo.siteside.page'),
        icon: 'uim:airplay',
        hideMenu: true,
      },
    },
  ],
}

export default siteside
