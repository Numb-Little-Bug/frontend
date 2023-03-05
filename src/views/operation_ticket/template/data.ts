import { FormSchema } from '/@/components/Form'
import { getSiteApi } from '/@/api/sys/site'

export const step1Schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '设备名称',
    colProps: {
      span: 12,
    },
    required: true,
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
    field: 'item',
    component: 'Divider',
    label: '操作项目',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'light_line',
    component: 'Select',
    label: '指示灯行数',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
      ],
    },
  },
  {
    field: 'strap_line',
    component: 'Select',
    label: '压板行数',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
      ],
    },
  },
  {
    field: 'switch_line',
    component: 'Select',
    label: '开关行数',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
      ],
    },
  },
  {
    field: 'step0',
    component: 'Input',
    label: '',
    colProps: {
      span: 24,
    },
    slot: 'slot',
  },
  {
    field: 'light_line_number',
    label: 'light_line_number',
    component: 'Divider',
    show: false,
  },
  {
    field: 'strap_line_number',
    label: 'strap_line_number',
    component: 'Divider',
    show: false,
  },
  {
    field: 'switch_line_number',
    label: 'switch_line_number',
    component: 'Divider',
    show: false,
  },
]
