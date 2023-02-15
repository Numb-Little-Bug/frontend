import { FormSchema } from '/@/components/Form'

export const schemas: FormSchema[] = [
  {
    field: 'type',
    component: 'Input',
    label: '设备类型',
    colProps: {
      span: 12,
    },
    required: true,
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
