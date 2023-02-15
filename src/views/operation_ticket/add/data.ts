import { FormSchema } from '/@/components/Form'
import { getSiteApi } from '/@/api/sys/site'
import { getSiteUserApi } from '/@/api/sys/user'
import { getALlDeviceApi, getDeviceApi } from "/@/api/sys/device";

export const step1Schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '任务名称',
    colProps: {
      span: 24,
    },
    // required: true,
  },
  {
    colProps: {
      span: 12,
    },
    component: 'ApiSelect',
    componentProps: {
      api: () => getSiteApi(),
      valueField: 'id',
      labelField: 'name',
      immediate: false,
    },
    // dynamicRules: () => {
    //   return [
    //     {
    //       required: true,
    //       message: '现场侧名不能为空',
    //       trigger: ['blur'],
    //     },
    //   ]
    // },
    field: 'site_side_name',
    label: '现场侧名',
  },
  {
    field: 'start_end_time',
    label: '起止日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    colProps: {
      span: 12,
    },
    // required: true,
  },
  {
    field: 'name1',
    component: 'ApiSelect',
    label: '唱票人',
    // required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      api: () => getSiteUserApi(),
      valueField: 'id',
      labelField: 'name',
      immediate: false,
    },
    // dynamicRules: ({ values }) => {
    //   return [
    //     {
    //       // required: true,
    //       message: '唱票人不能为空',
    //       trigger: ['blur'],
    //     },
    //     {
    //       //效验唱票人与操作人不同
    //       validator: (rule, value) => {
    //         if (value === values.operator_name) {
    //           return Promise.reject('唱票人与操作人不能相同')
    //         }
    //         return Promise.resolve()
    //       },
    //       trigger: ['change', 'blur'],
    //     },
    //   ]
    // },
  },
  {
    field: 'operator_name',
    component: 'ApiSelect',
    label: '操作人',
    //required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      api: () => getSiteUserApi(),
      valueField: 'id',
      labelField: 'name',
      immediate: false,
    },
    // dynamicRules: ({ values }) => {
    //   return [
    //     {
    //       // required: true,
    //       message: '操作人不能为空',
    //       trigger: ['blur'],
    //     },
    //     {
    //       //效验唱票人与操作人不同
    //       validator: (rule, value) => {
    //         if (value === values.name1) {
    //           return Promise.reject('唱票人与操作人不能相同')
    //         }
    //         return Promise.resolve()
    //       },
    //       trigger: ['change', 'blur'],
    //     },
    //   ]
    // },
  },
  {
    field: 'device',
    component: 'ApiSelect',
    label: '操作设备',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: () => getALlDeviceApi(),
      valueField: 'id',
      labelField: 'type',
      immediate: false,
    },
    //required: true,
  },
  {
    field: 'safety_precautions',
    component: 'InputTextArea',
    label: '安全事项',
    componentProps: {
      rows: 4,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'notes',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      rows: 3,
    },
    colProps: {
      span: 24,
    },
  },
]
