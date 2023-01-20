import { FormSchema } from '/@/components/Form'

export const step1Schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '任务名称',
    colProps: {
      span: 24,
    },
    //required: true,
  },
  {
    field: 'site_side_name',
    component: 'Input',
    label: '现场侧名',
    colProps: {
      span: 8,
    },
    //required: true,
  },
  {
    field: '[startTime, endTime]',
    label: '起止日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    colProps: {
      span: 8,
    },
    //required: true,
  },
  {
    field: 'type',
    component: 'Select',
    label: '类别',
    //required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '类别1',
          value: '1',
        },
        {
          label: '类别2',
          value: '2',
        },
        {
          label: '类别3',
          value: '3',
        },
        {
          label: '类别4',
          value: '4',
        },
      ],
    },
  },
  {
    field: 'name1',
    component: 'Input',
    label: '唱票人',
    //required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'operator_name',
    component: 'Input',
    label: '操作人',
    //required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'name2',
    component: 'Input',
    label: '发布人',
    //required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'step',
    component: 'InputTextArea',
    label: '操作步骤',
    componentProps: {
      rows: 14,
    },
    colProps: {
      span: 24,
    },
    //required: true,
  },
  {
    field: 'safety precautions',
    component: 'InputTextArea',
    label: '安全事项',
    componentProps: {
      rows: 4,
    },
    colProps: {
      span: 24,
    },
    //required: true,
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
