import type { AppRouteModule } from '/@/router/types'
import { RoleEnum } from '/@/enums/roleEnum'
import { LAYOUT } from '/@/router/constant'
//import { t } from '/@/hooks/web/useI18n'

const dispatch_statistics: AppRouteModule = {
  path: '/dispatch_statistics',
  name: 'DispatchStatisticsDemo',
  component: LAYOUT,
  redirect: '/dispatch_statistics/dispatch_chart',
  meta: {
    orderNo: 12,
    icon: 'wpf:statistics',
    title: 'Dispatch Statistics',
    roles: [RoleEnum.DISPATCH],
  },
  children: [
    {
      path: 'dispatch_chart',
      name: 'DispatchChart',
      component: () => import('/@/views/dispatch_statistics/chart/index.vue'),
      meta: {
        // affix: true,
        title: 'Dispatch chart',
        icon: 'charm:chart-bar',
      },
    },
    {
      path: 'dispatch_table',
      name: 'DispatchTable',
      component: () => import('/@/views/dispatch_statistics/table/index.vue'),
      meta: {
        title: 'Dispatch table',
        icon: 'iconoir:table-rows',
      },
    },
  ],
}

export default dispatch_statistics
