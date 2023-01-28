import type { AppRouteModule } from '/@/router/types'
import { RoleEnum } from '/@/enums/roleEnum'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const site_statistics: AppRouteModule = {
  path: '/site_statistics',
  name: 'SiteStatisticsDemo',
  component: LAYOUT,
  redirect: '/site_statistics/chart',
  meta: {
    orderNo: 14,
    icon: 'wpf:statistics',
    title: t('routes.demo.statistics.StatisticsDemo'),
    roles: [RoleEnum.SITE],
  },
  children: [
    {
      path: 'chart',
      name: 'Chart',
      component: () => import('/@/views/site_statistics/chart/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.demo.statistics.chart'),
        icon: 'charm:chart-bar',
      },
    },
    {
      path: 'table',
      name: 'Table',
      component: () => import('/@/views/site_statistics/table/index.vue'),
      meta: {
        title: t('routes.demo.statistics.table'),
        icon: 'iconoir:table-rows',
      },
    },
  ],
}

export default site_statistics
