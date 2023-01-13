import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const statistics: AppRouteModule = {
  path: '/Statistics',
  name: 'StatisticsDemo',
  component: LAYOUT,
  redirect: '/Statistics/chart',
  meta: {
    orderNo: 13,
    icon: 'wpf:statistics',
    title: t('routes.demo.statistics.StatisticsDemo'),
  },
  children: [
    {
      path: 'chart',
      name: 'Chart',
      component: () => import('/@/views/statistics/chart/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.demo.statistics.chart'),
        icon: 'charm:chart-bar',
      },
    },
    {
      path: 'table',
      name: 'Table',
      component: () => import('/@/views/statistics/table/index.vue'),
      meta: {
        title: t('routes.demo.statistics.table'),
        icon: 'iconoir:table-rows',
      },
    },
  ],
}

export default statistics
