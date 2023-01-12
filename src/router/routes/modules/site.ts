import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const site: AppRouteModule = {
  path: '/site',
  name: 'SiteDemo',
  component: LAYOUT,
  redirect: '/site/index',
  meta: {
    orderNo: 20000,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll',
    title: t('routes.demo.site.page'),
  },
  children: [
    {
      path: 'index',
      name: 'SiteDemoPage',
      component: () => import('/@/views/siteside/index.vue'),
      meta: {
        title: t('routes.demo.site.page'),
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
}

export default site
