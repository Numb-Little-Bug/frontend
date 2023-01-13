import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const site_side: AppRouteModule = {
  path: '/site_side',
  name: 'SiteSideDemo',
  component: LAYOUT,
  redirect: '/site_side/index',
  meta: {
    orderNo: 11,
    hideChildrenInMenu: true,
    icon: 'uim:airplay',
    title: t('routes.demo.site_side.page'),
  },
  children: [
    {
      path: 'index',
      name: 'SiteSideDemoPage',
      component: () => import('/src/views/siteSide/index.vue'),
      meta: {
        title: t('routes.demo.site_side.page'),
        icon: 'uim:airplay',
        hideMenu: true,
      },
    },
  ],
}

export default site_side
