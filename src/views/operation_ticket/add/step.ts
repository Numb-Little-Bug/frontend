import { FormSchema } from '/@/components/Form'
import { getSiteApi } from '/@/api/sys/site'
import { getSiteUserApi } from '/@/api/sys/user'
import { getAllDeviceApi, getDeviceApi } from "/@/api/sys/device";

export const step2Schemas: FormSchema[] = [
  {
    field: 'step',
    component: 'Divider',
    label: '操作步骤',
    colProps: {
      span: 19,
    },
  },
  {
    field: 'step0',
    component: 'Input',
    label: '',
    colProps: {
      span: 5,
    },
    slot: 'customSlot',
  },
  {
    field: 'step1',
    label: '步骤1',
    colProps: {
      span: 24,
    },
    component: 'Input',
    show: false,
  },
  {
    field: 'step_end',
    component: 'Divider',
    label: '',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'step_end',
    component: 'Divider',
    label: '',
    colProps: {
      span: 24,
    },
  },
]
