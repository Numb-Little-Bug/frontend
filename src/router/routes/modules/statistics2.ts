import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const statistics2: AppRouteModule = {
  path: '/Statistics2',
  name: 'Statistics2',
  component: LAYOUT,
  redirect: '/Statistics copy/chart',
  meta: {
    orderNo: 15,
    icon: 'wpf:statistics',
    title: t('routes.demo.statistics.StatisticsDemo'),
  },
  children: [
    {
      path: 'chart1',
      name: 'Chart1',
      component: () => import('/@/views/Statistics copy/chart/index.vue'),
      meta: {
        title: t('routes.demo.statistics.chart'),
        icon: 'charm:chart-bar',
      },
    },
    {
      path: 'table1',
      name: 'Table1',
      component: () => import('/@/views/Statistics copy/table/index.vue'),
      meta: {
        title: t('routes.demo.statistics.table'),
        icon: 'iconoir:table-rows',
      },
    },
  ],
}

export default statistics2
